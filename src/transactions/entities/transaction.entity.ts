import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export type TransactionType = 'earned' | 'spent' | 'payout';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ['earned', 'spent', 'payout'],
  })
  type: TransactionType;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;
}
