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
import {Recorridos} from '../models';
import {RecorridosRepository} from '../repositories';
@authenticate('jwt')
export class RecorridosController {
  constructor(
    @repository(RecorridosRepository)
    public recorridosRepository: RecorridosRepository,
  ) { }

  @post('/recorridos')
  @response(200, {
    description: 'Recorridos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recorridos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recorridos, {
            title: 'NewRecorridos',
            exclude: ['id'],
          }),
        },
      },
    })
    recorridos: Omit<Recorridos, 'id'>,
  ): Promise<Recorridos> {
    return this.recorridosRepository.create(recorridos);
  }

  @get('/recorridos/count')
  @response(200, {
    description: 'Recorridos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recorridos) where?: Where<Recorridos>,
  ): Promise<Count> {
    return this.recorridosRepository.count(where);
  }

  @get('/recorridos')
  @response(200, {
    description: 'Array of Recorridos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recorridos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recorridos) filter?: Filter<Recorridos>,
  ): Promise<Recorridos[]> {
    return this.recorridosRepository.find(filter);
  }

  @patch('/recorridos')
  @response(200, {
    description: 'Recorridos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recorridos, {partial: true}),
        },
      },
    })
    recorridos: Recorridos,
    @param.where(Recorridos) where?: Where<Recorridos>,
  ): Promise<Count> {
    return this.recorridosRepository.updateAll(recorridos, where);
  }

  @get('/recorridos/{id}')
  @response(200, {
    description: 'Recorridos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recorridos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Recorridos, {exclude: 'where'}) filter?: FilterExcludingWhere<Recorridos>
  ): Promise<Recorridos> {
    return this.recorridosRepository.findById(id, filter);
  }

  @patch('/recorridos/{id}')
  @response(204, {
    description: 'Recorridos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recorridos, {partial: true}),
        },
      },
    })
    recorridos: Recorridos,
  ): Promise<void> {
    await this.recorridosRepository.updateById(id, recorridos);
  }

  @put('/recorridos/{id}')
  @response(204, {
    description: 'Recorridos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() recorridos: Recorridos,
  ): Promise<void> {
    await this.recorridosRepository.replaceById(id, recorridos);
  }

  @del('/recorridos/{id}')
  @response(204, {
    description: 'Recorridos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.recorridosRepository.deleteById(id);
  }
}
