import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Repository } from 'typeorm';
import { AccountDto } from '../dto/account.dto';

@Injectable()
export class AccountRepository {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  getAll() {
    return this.accountRepository.find();
  }

  async create(data: AccountDto) {
    const context = {
      context: this.constructor.name,
      method: this.create.name,
    };
    const newAccount = this.accountRepository.create(data);
    try {
      return await newAccount.save();
    } catch (err) {
      this.logger.error('cannot be created', {
        ...context,
      });
    }
  }
}
