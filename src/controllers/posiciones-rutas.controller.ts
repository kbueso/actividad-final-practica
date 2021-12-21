import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Posiciones,
  Rutas,
} from '../models';
import {PosicionesRepository} from '../repositories';

export class PosicionesRutasController {
  constructor(
    @repository(PosicionesRepository)
    public posicionesRepository: PosicionesRepository,
  ) { }

  @get('/posiciones/{id}/rutas', {
    responses: {
      '200': {
        description: 'Rutas belonging to Posiciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rutas)},
          },
        },
      },
    },
  })
  async getRutas(
    @param.path.string('id') id: typeof Posiciones.prototype.id,
  ): Promise<Rutas> {
    return this.posicionesRepository.rutas(id);
  }
}
