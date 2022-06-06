import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TransactionRepository {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(data: Partial<Transaction>) {
    return await this.transactionRepository.manager.transaction(
      async (entityManager) => {
        const { sender, recipient, amount } = data;

        await entityManager.query(
          `UPDATE account SET balance = balance - $1 WHERE id = $2`,
          [amount, sender.id],
        );

        const resultingSenderBalance = await entityManager.query(
          `SELECT account.balance FROM account WHERE account.id = $1`,
          [sender.id],
        );

        if (resultingSenderBalance[0]?.balance < 0) {
          throw new BadRequestException(
            'Sender has not enough funds for the operation',
          );
        }

        await entityManager.query(
          `UPDATE account SET balance = balance + $1 WHERE id = $2`,
          [amount, recipient.id],
        );

        const resultingRecipientBalance = await entityManager.query(
          `SELECT account.balance FROM account WHERE account.id = $1`,
          [recipient.id],
        );

        const newAccount = this.transactionRepository.create({
          amount: data.amount,
        });
        newAccount.sender = data.sender;
        newAccount.recipient = data.recipient;
        newAccount.senderBalance = parseInt(resultingSenderBalance[0].balance);
        newAccount.recipientBalance = parseInt(
          resultingRecipientBalance[0].balance,
        );
        const response = await newAccount.save();
        return plainToClass(Transaction, response);
      },
    );
  }

  getQueryBuilder() {
    return this.transactionRepository
      .createQueryBuilder('transaction')
      .addOrderBy('transaction.createdAt', 'DESC')
      .addSelect('sender.name')
      .addSelect('sender.dni')
      .addSelect('sender.bank')
      .addSelect('sender.accountType')
      .addSelect('sender.accountNumber')
      .addSelect('recipient.name')
      .addSelect('recipient.dni')
      .addSelect('recipient.bank')
      .addSelect('recipient.accountType')
      .addSelect('recipient.accountNumber')
      .innerJoin('transaction.sender', 'sender')
      .innerJoin('transaction.recipient', 'recipient');
  }

  getAll() {
    this.logger.info('repository works', { context: this.constructor.name });
    return this.getQueryBuilder().getMany();
  }

  getById(id: string) {
    return this.getQueryBuilder()
      .where('sender.id = :id OR recipient.id = :id', { id })
      .getMany();
  }
}
