import { IsPositive, IsUUID} from 'class-validator';
import {NotEqualsProperty} from "../../../shared/decorators/NotEqualsProperty.decorator";

export class TransactionDto {
  @IsPositive()
  amount: number;

  @IsUUID()
  senderId: string;

  @IsUUID()
  @NotEqualsProperty('senderId')
  recipientId: string;
}
