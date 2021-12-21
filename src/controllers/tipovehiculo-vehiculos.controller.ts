import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Tipovehiculo,
  Vehiculos,
} from '../models';
import {TipovehiculoRepository} from '../repositories';

export class TipovehiculoVehiculosController {
  constructor(
    @repository(TipovehiculoRepository)
    public tipovehiculoRepository: TipovehiculoRepository,
  ) { }

  @get('/tipovehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculos belonging to Tipovehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculos)},
          },
        },
      },
    },
  })
  async getVehiculos(
    @param.path.string('id') id: typeof Tipovehiculo.prototype.id,
  ): Promise<Vehiculos> {
    return this.tipovehiculoRepository.vehiculos(id);
  }
}
