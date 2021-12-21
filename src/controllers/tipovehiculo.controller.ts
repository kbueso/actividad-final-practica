import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Tipovehiculo} from '../models';
import {TipovehiculoRepository} from '../repositories';

@authenticate('jwt')
export class TipovehiculoController {
  constructor(
    @repository(TipovehiculoRepository)
    public tipovehiculoRepository: TipovehiculoRepository,
  ) { }

  @post('/tipovehiculos')
  @response(200, {
    description: 'Tipovehiculo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tipovehiculo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipovehiculo, {
            title: 'NewTipovehiculo',
            exclude: ['id'],
          }),
        },
      },
    })
    tipovehiculo: Omit<Tipovehiculo, 'id'>,
  ): Promise<Tipovehiculo> {
    return this.tipovehiculoRepository.create(tipovehiculo);
  }

  @get('/tipovehiculos/count')
  @response(200, {
    description: 'Tipovehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tipovehiculo) where?: Where<Tipovehiculo>,
  ): Promise<Count> {
    return this.tipovehiculoRepository.count(where);
  }

  @get('/tipovehiculos')
  @response(200, {
    description: 'Array of Tipovehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tipovehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tipovehiculo) filter?: Filter<Tipovehiculo>,
  ): Promise<Tipovehiculo[]> {
    return this.tipovehiculoRepository.find(filter);
  }

  @patch('/tipovehiculos')
  @response(200, {
    description: 'Tipovehiculo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipovehiculo, {partial: true}),
        },
      },
    })
    tipovehiculo: Tipovehiculo,
    @param.where(Tipovehiculo) where?: Where<Tipovehiculo>,
  ): Promise<Count> {
    return this.tipovehiculoRepository.updateAll(tipovehiculo, where);
  }

  @get('/tipovehiculos/{id}')
  @response(200, {
    description: 'Tipovehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tipovehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tipovehiculo, {exclude: 'where'}) filter?: FilterExcludingWhere<Tipovehiculo>
  ): Promise<Tipovehiculo> {
    return this.tipovehiculoRepository.findById(id, filter);
  }

  @patch('/tipovehiculos/{id}')
  @response(204, {
    description: 'Tipovehiculo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipovehiculo, {partial: true}),
        },
      },
    })
    tipovehiculo: Tipovehiculo,
  ): Promise<void> {
    await this.tipovehiculoRepository.updateById(id, tipovehiculo);
  }

  @put('/tipovehiculos/{id}')
  @response(204, {
    description: 'Tipovehiculo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipovehiculo: Tipovehiculo,
  ): Promise<void> {
    await this.tipovehiculoRepository.replaceById(id, tipovehiculo);
  }

  @del('/tipovehiculos/{id}')
  @response(204, {
    description: 'Tipovehiculo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipovehiculoRepository.deleteById(id);
  }
}
