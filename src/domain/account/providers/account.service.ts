import { Inject, Injectable } from '@nestjs/common';
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
    };
    this.logger.info('Creating new account', context);
    return this.accountRepository.create(accountDto);
  }

  getAll() {
    const context = {
      context: this.constructor.name,
      method: this.create.name,
    };
    this.logger.info('Obtaining accounts', context);
    return this.accountRepository.getAll();
  }

  getById(id: string) {
    const context = {
      context: this.constructor.name,
      method: this.create.name,
      id
    };
    this.logger.info('Obtaining accountby id', context);
    return this.accountRepository.getById(id);
  }
}
