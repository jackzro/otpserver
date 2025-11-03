import { EntityRepository, Repository } from 'typeorm';
import { NumberReceiver } from '../entities/number-receiver.entity';

@EntityRepository(NumberReceiver)
export class NumberReceiverRepository extends Repository<NumberReceiver> {}
