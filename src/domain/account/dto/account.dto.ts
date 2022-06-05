import { IsEmail, IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { AccountTypeEnum } from '../enums/account-type.enum';

export class AccountDto {
  @IsNotEmpty({ always: true })
  name: string;

  @IsNotEmpty({ always: true })
  dni: string;

  @IsEmail({}, { always: true })
  email: string;

  @IsNotEmpty({ always: true })
  phone: string;

  @IsNotEmpty({ always: true })
  bank: string;

  @IsEnum(AccountTypeEnum, { always: true })
  accountType: AccountTypeEnum;

  @IsPositive({ groups: ['search'] })
  accountNumber: number;
}
