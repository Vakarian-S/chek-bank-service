import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Repository } from 'typeorm';
import { AccountDto } from '../dto/account.dto';
import { AccountFilterInterface } from '../interfaces/account-filter.interface';

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

  getMany(fields: AccountFilterInterface) {
    return this.accountRepository.findBy(fields);
  }

  getOne(fields: AccountFilterInterface) {
    return this.accountRepository.findOneBy(fields);
  }

  async create(data: AccountDto) {
    const newAccount = this.accountRepository.create(data);
    return await newAccount.save();
  }

  async addRecipient(id: string, recipient: Account) {
    const account = await this.getAccountWithRecipients(id);
    await this.accountRepository
      .createQueryBuilder()
      .relation(Account, 'savedRecipients')
      .of(account)
      .add(recipient);
  }

  getAccountWithRecipients(id: string) {
    return this.accountRepository
      .createQueryBuilder('account')
      .addSelect('savedRecipients.accountNumber')
      .addSelect('savedRecipients.name')
      .addSelect('savedRecipients.email')
      .addSelect('savedRecipients.bank')
      .addSelect('savedRecipients.accountType')
      .leftJoin('account.savedRecipients', 'savedRecipients')
      .where('account.id = :id', { id })
      .getOne();
  }
}
