import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Licencias, LicenciasRelations, Transportistas} from '../models';
import {TransportistasRepository} from './transportistas.repository';

export class LicenciasRepository extends DefaultCrudRepository<
  Licencias,
  typeof Licencias.prototype.id,
  LicenciasRelations
> {

  public readonly transportistas: BelongsToAccessor<Transportistas, typeof Licencias.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('TransportistasRepository') protected transportistasRepositoryGetter: Getter<TransportistasRepository>,
  ) {
    super(Licencias, dataSource);
    this.transportistas = this.createBelongsToAccessorFor('transportistas', transportistasRepositoryGetter,);
    this.registerInclusionResolver('transportistas', this.transportistas.inclusionResolver);
  }
}
