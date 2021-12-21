import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Licencias,
  Transportistas,
} from '../models';
import {LicenciasRepository} from '../repositories';

export class LicenciasTransportistasController {
  constructor(
    @repository(LicenciasRepository)
    public licenciasRepository: LicenciasRepository,
  ) { }

  @get('/licencias/{id}/transportistas', {
    responses: {
      '200': {
        description: 'Transportistas belonging to Licencias',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transportistas)},
          },
        },
      },
    },
  })
  async getTransportistas(
    @param.path.string('id') id: typeof Licencias.prototype.id,
  ): Promise<Transportistas> {
    return this.licenciasRepository.transportistas(id);
  }
}
