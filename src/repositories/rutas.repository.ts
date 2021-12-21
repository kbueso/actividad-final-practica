import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Rutas, RutasRelations} from '../models';

export class RutasRepository extends DefaultCrudRepository<
  Rutas,
  typeof Rutas.prototype.id,
  RutasRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Rutas, dataSource);
  }
}
