import { EntityRepository, Repository } from 'typeorm';
import { OtpRequest } from '../entities/otp-request.entity';

@EntityRepository(OtpRequest)
export class OtpRequestRepository extends Repository<OtpRequest> {}
