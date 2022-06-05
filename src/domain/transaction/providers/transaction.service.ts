import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'winston';
import { TransactionRepository } from '../repository/transaction.repository';
import { TransactionDto } from '../dto/transaction.dto';
import { AccountService } from '../../account/providers/account.service';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly accountService: AccountService,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async create(transactionDto: TransactionDto) {
    const context = {
      context: this.constructor.name,
      method: this.create.name,
    };
    this.logger.info('Creating new transaction', context);
    const { senderId, recipientId, amount } = transactionDto;

    const sender = await this.accountService.getById(senderId);
    if (!sender) {
      throw new NotFoundException('sender not found');
    }

    const recipient = await this.accountService.getById(recipientId);
    if (!recipient) {
      throw new NotFoundException('recipient not found');
    }

    if (sender.balance < amount) {
      throw new BadRequestException([
        'sender does not have enough balance to handle this transaction',
      ]);
    }

    const transactionData = {
      sender,
      recipient,
      amount,
    };

    return this.transactionRepository.create(transactionData);
  }

  get() {
    this.logger.info('service works', { context: this.constructor.name });
    return this.transactionRepository.getAll();
  }
}
