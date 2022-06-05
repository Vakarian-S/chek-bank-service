import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './providers/transaction.service';
import { TransactionRepository } from './repository/transaction.repository';
import { TransactionModule } from './entities/transaction.module';
import {AccountHttpModule} from "../account/account-http.module";

@Module({
  imports: [TransactionModule, AccountHttpModule],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
})
export class TransactionHttpModule {}
