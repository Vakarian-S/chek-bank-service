import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionRepository {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(data: Partial<Transaction>) {
    const newAccount = this.transactionRepository.create({
      amount: data.amount,
    });
    newAccount.sender = data.sender;
    newAccount.recipient = data.recipient;
    return await newAccount.save();
  }

  getAll() {
    this.logger.info('repository works', { context: this.constructor.name });
    return this.transactionRepository
      .createQueryBuilder('transaction')
      .addSelect('sender.name')
      .addSelect('recipient.name')
      .innerJoin('transaction.sender', 'sender')
      .innerJoin('transaction.recipient', 'recipient')
      .getMany();
  }
}
