import { EntityRepository, Repository } from 'typeorm';
import { PhoneNumber } from '../entities/number.entity';

@EntityRepository(PhoneNumber)
export class PhoneNumberRepository extends Repository<PhoneNumber> {}
