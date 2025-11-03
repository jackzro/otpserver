import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { PhoneNumber } from './number.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('number_receivers')
export class NumberReceiver {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PhoneNumber, (num) => num.receivers, { onDelete: 'CASCADE' })
  number: PhoneNumber;

  @ManyToOne(() => User, (user) => user.numberReceivers, {
    onDelete: 'CASCADE',
  })
  receiver: User;

  @Column({ default: 1 })
  priority: number;

  @Column({ default: true })
  active: boolean;
}
