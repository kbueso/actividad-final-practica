import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Recorridos, RecorridosRelations} from '../models';

export class RecorridosRepository extends DefaultCrudRepository<
  Recorridos,
  typeof Recorridos.prototype.id,
  RecorridosRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Recorridos, dataSource);
  }
}
