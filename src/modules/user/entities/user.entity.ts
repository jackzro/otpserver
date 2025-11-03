import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoles } from '../enums/user.enum';
import { NumberReceiver } from 'src/numbers/entities/number-receiver.entity';
import { OtpRequest } from 'src/numbers/entities/otp-request.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRoles })
  @Column()
  role: UserRoles;

  @Column({ default: '0' })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OtpRequest, (otp) => otp.sender)
  sentOtps: OtpRequest[];

  @OneToMany(() => OtpRequest, (otp) => otp.receiver)
  receivedOtps: OtpRequest[];

  @OneToMany(() => NumberReceiver, (nr) => nr.receiver)
  numberReceivers: NumberReceiver[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
