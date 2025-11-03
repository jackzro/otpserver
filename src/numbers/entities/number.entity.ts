import { User } from 'src/modules/user/entities/user.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { NumberReceiver } from './number-receiver.entity';
import { OtpRequest } from './otp-request.entity';

@Entity({ name: 'numbers' })
export class PhoneNumber extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phone_number: string;

  @Column({ nullable: true })
  label: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => User, { nullable: false })
  createdBy: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => NumberReceiver, (nr) => nr.number)
  receivers: NumberReceiver[];

  @OneToMany(() => OtpRequest, (otp) => otp.number)
  otpRequests: OtpRequest[];

  @UpdateDateColumn()
  updatedAt: Date;
}
