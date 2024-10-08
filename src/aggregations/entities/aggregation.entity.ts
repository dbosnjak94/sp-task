import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('aggregation')
export class Aggregation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;

  @Column('decimal', { precision: 10, scale: 2 })
  earned: number;

  @Column('decimal', { precision: 10, scale: 2 })
  spent: number;

  @Column('decimal', { precision: 10, scale: 2 })
  payout: number;

  @Column('decimal', { precision: 10, scale: 2 })
  paidOut: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;

  @CreateDateColumn()
  createdAt: Date;
}
