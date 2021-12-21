import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Licencias, LicenciasRelations} from '../models';

export class LicenciasRepository extends DefaultCrudRepository<
  Licencias,
  typeof Licencias.prototype.id,
  LicenciasRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Licencias, dataSource);
  }
}
