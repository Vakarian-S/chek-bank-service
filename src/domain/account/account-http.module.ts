import { Module } from '@nestjs/common';
import {AccountController} from "./controllers/account.controller";
import {AccountService} from "./providers/account.service";
import {AccountRepository} from "./respository/account.repository";
import {AccountModule} from "./entities/account.module";

@Module({
  imports: [AccountModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountHttpModule {}
