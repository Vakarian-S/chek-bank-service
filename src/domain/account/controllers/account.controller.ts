import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
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
  async getAll() {
    this.logger.info('controller works', { context: this.constructor.name });
    return this.accountService.getAll();
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      groups: ['create'],
    }),
  )
  async create(@Body() accountDto: AccountDto) {
    this.logger.info('controller works', { context: this.constructor.name });
    return this.accountService.create(accountDto);
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) accountId: string) {
    return this.accountService.getById(accountId);
  }

  @Get(':id/saved-recipients')
  getRecipients(@Param('id', new ParseUUIDPipe()) accountId: string) {
    return this.accountService.getRecipients(accountId);
  }

  @Post(':id/saved-recipients')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      groups: ['search'],
    }),
  )
  addRecipient(
    @Param('id', new ParseUUIDPipe()) accountId: string,
    @Body() accountDto: AccountDto,
  ) {
    return this.accountService.addRecipient(accountId, accountDto);
  }
}
