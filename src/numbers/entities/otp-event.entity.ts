import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OtpRequest } from './otp-request.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('otp_events')
export class OtpEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OtpRequest, (otp) => otp.events, { onDelete: 'CASCADE' })
  otpRequest: OtpRequest;

  @ManyToOne(() => User, { nullable: true })
  actor: User;

  @Column()
  event: string;

  @Column({ type: 'json', nullable: true })
  details: Record<string, any>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
