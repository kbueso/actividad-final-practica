import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Posiciones, PosicionesRelations, Rutas} from '../models';
import {RutasRepository} from './rutas.repository';

export class PosicionesRepository extends DefaultCrudRepository<
  Posiciones,
  typeof Posiciones.prototype.id,
  PosicionesRelations
> {

  public readonly rutas: BelongsToAccessor<Rutas, typeof Posiciones.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('RutasRepository') protected rutasRepositoryGetter: Getter<RutasRepository>,
  ) {
    super(Posiciones, dataSource);
    this.rutas = this.createBelongsToAccessorFor('rutas', rutasRepositoryGetter,);
    this.registerInclusionResolver('rutas', this.rutas.inclusionResolver);
  }
}
