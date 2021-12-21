import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Transportistas, TransportistasRelations} from '../models';

export class TransportistasRepository extends DefaultCrudRepository<
  Transportistas,
  typeof Transportistas.prototype.id,
  TransportistasRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Transportistas, dataSource);
  }
}
