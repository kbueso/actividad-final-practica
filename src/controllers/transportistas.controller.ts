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
import {Transportistas} from '../models';
import {TransportistasRepository} from '../repositories';

@authenticate('jwt')
export class TransportistasController {
  constructor(
    @repository(TransportistasRepository)
    public transportistasRepository: TransportistasRepository,
  ) { }

  @post('/transportistas')
  @response(200, {
    description: 'Transportistas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Transportistas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transportistas, {
            title: 'NewTransportistas',
            exclude: ['id'],
          }),
        },
      },
    })
    transportistas: Omit<Transportistas, 'id'>,
  ): Promise<Transportistas> {
    return this.transportistasRepository.create(transportistas);
  }

  @get('/transportistas/count')
  @response(200, {
    description: 'Transportistas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Transportistas) where?: Where<Transportistas>,
  ): Promise<Count> {
    return this.transportistasRepository.count(where);
  }

  @get('/transportistas')
  @response(200, {
    description: 'Array of Transportistas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Transportistas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Transportistas) filter?: Filter<Transportistas>,
  ): Promise<Transportistas[]> {
    return this.transportistasRepository.find(filter);
  }

  @patch('/transportistas')
  @response(200, {
    description: 'Transportistas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transportistas, {partial: true}),
        },
      },
    })
    transportistas: Transportistas,
    @param.where(Transportistas) where?: Where<Transportistas>,
  ): Promise<Count> {
    return this.transportistasRepository.updateAll(transportistas, where);
  }

  @get('/transportistas/{id}')
  @response(200, {
    description: 'Transportistas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Transportistas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Transportistas, {exclude: 'where'}) filter?: FilterExcludingWhere<Transportistas>
  ): Promise<Transportistas> {
    return this.transportistasRepository.findById(id, filter);
  }

  @patch('/transportistas/{id}')
  @response(204, {
    description: 'Transportistas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transportistas, {partial: true}),
        },
      },
    })
    transportistas: Transportistas,
  ): Promise<void> {
    await this.transportistasRepository.updateById(id, transportistas);
  }

  @put('/transportistas/{id}')
  @response(204, {
    description: 'Transportistas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() transportistas: Transportistas,
  ): Promise<void> {
    await this.transportistasRepository.replaceById(id, transportistas);
  }

  @del('/transportistas/{id}')
  @response(204, {
    description: 'Transportistas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.transportistasRepository.deleteById(id);
  }
}
