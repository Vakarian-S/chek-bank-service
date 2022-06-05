import {Body, Controller, Get, Inject, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { Logger } from 'winston';
import { TransactionService } from '../providers/transaction.service';
import {TransactionDto} from "../dto/transaction.dto";

@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly historyService: TransactionService,
  ) {}

  @Get()
  async get() {
    return this.historyService.get();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(@Body() transactionDto: TransactionDto) {
    this.logger.info('controller works', { context: this.constructor.name });
    return this.historyService.create(transactionDto);
  }
}
