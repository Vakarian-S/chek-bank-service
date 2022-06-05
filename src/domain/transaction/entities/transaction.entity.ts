import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../../account/entities/account.entity';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric' })
  amount: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt?: Date;

  @ManyToOne(() => Account, (account) => account.transactionsSent)
  sender: Account;

  @ManyToOne(() => Account, (account) => account.transactionsReceived)
  recipient: Account;
}
