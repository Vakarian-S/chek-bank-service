import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'winston';
import { AccountRepository } from '../repository/account.repository';
import { AccountDto } from '../dto/account.dto';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly accountRepository: AccountRepository,
  ) {}

  async create(accountDto: AccountDto): Promise<Account> {
    const context = {
      context: this.constructor.name,
      method: this.create.name,
      accountDto,
    };
    this.logger.info('Creating new account', context);
    return this.accountRepository.create(accountDto);
  }

  getAll() {
    const context = {
      context: this.constructor.name,
      method: this.getAll.name,
    };
    this.logger.info('Obtaining accounts', context);
    return this.accountRepository.getAll();
  }

  getById(id: string) {
    const context = {
      context: this.constructor.name,
      method: this.getById.name,
      id,
    };
    this.logger.info('Obtaining account by id', context);
    return this.accountRepository.getById(id);
  }

  async addRecipient(accountId: string, recipientDto: AccountDto) {
    const context = {
      context: this.constructor.name,
      method: this.addRecipient.name,
    };
    this.logger.info('Attempting to create recipient', context);
    const accountRecipients = await this.getRecipients(accountId);

    this.logger.info('Obtaining account with the provided data', context);

    const recipient = await this.accountRepository.getOne(recipientDto);
    if (!recipient) {
      throw new NotFoundException(['Recipient not found']);
    }

    this.logger.info('data', { ...context, recipient, accountRecipients });
    if (
      accountRecipients.some(
        (account) => account.accountNumber === recipient.accountNumber,
      )
    ) {
      throw new BadRequestException(['Recipient is already saved']);
    }

    return this.accountRepository.addRecipient(accountId, recipient);
  }

  async getRecipients(accountId: string) {
    const context = {
      context: this.constructor.name,
      method: this.getRecipients.name,
    };
    this.logger.info('Attempting to get recipients', context);
    const account = await this.accountRepository.getAccountWithRecipients(
      accountId,
    );
    if (!account) {
      throw new NotFoundException(['Account not found']);
    }
    return account.savedRecipients;
  }
}
