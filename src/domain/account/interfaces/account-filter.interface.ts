import { AccountTypeEnum } from '../enums/account-type.enum';

export interface AccountFilterInterface {
  id?: string;
  name?: string;
  dni?: string;
  email?: string;
  phone?: string;
  bank?: string;
  accountType?: AccountTypeEnum;
  accountNumber?: number;
}
