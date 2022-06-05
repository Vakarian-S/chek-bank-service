import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Logger } from 'winston';
import { AccountService } from '../providers/account.service';
import { AccountDto } from '../dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly accountService: AccountService,
  ) {}

  @Get()
  async getAccounts() {
    this.logger.info('controller works', { context: this.constructor.name });
    return this.accountService.getAccounts();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async createAccount(@Body() accountDto: AccountDto) {
    this.logger.info('controller works', { context: this.constructor.name });
    return this.accountService.create(accountDto);
  }
}
