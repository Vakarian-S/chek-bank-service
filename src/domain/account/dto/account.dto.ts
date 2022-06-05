import {IsEmail, IsEnum, IsNotEmpty} from "class-validator";
import {AccountTypeEnum} from "../enums/account-type.enum";

export class AccountDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  dni: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  bank: string;

  @IsEnum(AccountTypeEnum)
  accountType: AccountTypeEnum;

  @IsNotEmpty()
  accountNumber: string;
}
