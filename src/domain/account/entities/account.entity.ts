import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountTypeEnum } from '../enums/account-type.enum';

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
}
