import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OtpRequest } from './otp-request.entity';

@Entity('apps')
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => OtpRequest, (otp) => otp.app)
  otpRequests: OtpRequest[];
}
