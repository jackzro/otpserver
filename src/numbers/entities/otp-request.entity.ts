import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { App } from './app.entity';
import { OtpEvent } from './otp-event.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { PhoneNumber } from './number.entity';

@Entity('otp_requests')
export class OtpRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sentOtps)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedOtps, { nullable: true })
  receiver: User;

  @ManyToOne(() => PhoneNumber, (num) => num.otpRequests)
  number: PhoneNumber;

  @ManyToOne(() => App, (app) => app.otpRequests)
  app: App;

  @Column({
    type: 'enum',
    enum: [
      'pending',
      'requested',
      'sent',
      'received',
      'filled',
      'verified',
      'expired',
    ],
    default: 'pending',
  })
  status: string;

  @Column({ nullable: true })
  otpCode: string;

  @Column({ type: 'text', nullable: true })
  otpMessage: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  requestedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  filledAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  verifiedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiredAt: Date;

  @OneToMany(() => OtpEvent, (event) => event.otpRequest)
  events: OtpEvent[];
}
