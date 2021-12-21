import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Tipovehiculo, TipovehiculoRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class TipovehiculoRepository extends DefaultCrudRepository<
  Tipovehiculo,
  typeof Tipovehiculo.prototype.id,
  TipovehiculoRelations
> {

  public readonly vehiculos: BelongsToAccessor<Vehiculos, typeof Tipovehiculo.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(Tipovehiculo, dataSource);
    this.vehiculos = this.createBelongsToAccessorFor('vehiculos', vehiculosRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
