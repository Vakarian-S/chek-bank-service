import {
  BaseEntity,
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountTypeEnum } from '../enums/account-type.enum';
import {Transaction} from "../../transaction/entities/transaction.entity";

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  dni: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  bank: string;

  @Column({ type: 'enum', enum: AccountTypeEnum })
  accountType: AccountTypeEnum;

  @Column({ type: 'varchar' })
  accountNumber: string;

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  transactionsSent: Transaction[]

  @OneToMany(() => Transaction, (transaction) => transaction.recipient)
  transactionsReceived: Transaction[]
}
