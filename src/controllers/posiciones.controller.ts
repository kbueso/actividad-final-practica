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
import {Posiciones} from '../models';
import {PosicionesRepository} from '../repositories';
@authenticate('jwt')
export class PosicionesController {
  constructor(
    @repository(PosicionesRepository)
    public posicionesRepository: PosicionesRepository,
  ) { }

  @post('/posiciones')
  @response(200, {
    description: 'Posiciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Posiciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posiciones, {
            title: 'NewPosiciones',
            exclude: ['id'],
          }),
        },
      },
    })
    posiciones: Omit<Posiciones, 'id'>,
  ): Promise<Posiciones> {
    return this.posicionesRepository.create(posiciones);
  }

  @get('/posiciones/count')
  @response(200, {
    description: 'Posiciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Posiciones) where?: Where<Posiciones>,
  ): Promise<Count> {
    return this.posicionesRepository.count(where);
  }

  @get('/posiciones')
  @response(200, {
    description: 'Array of Posiciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Posiciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Posiciones) filter?: Filter<Posiciones>,
  ): Promise<Posiciones[]> {
    return this.posicionesRepository.find(filter);
  }

  @patch('/posiciones')
  @response(200, {
    description: 'Posiciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posiciones, {partial: true}),
        },
      },
    })
    posiciones: Posiciones,
    @param.where(Posiciones) where?: Where<Posiciones>,
  ): Promise<Count> {
    return this.posicionesRepository.updateAll(posiciones, where);
  }

  @get('/posiciones/{id}')
  @response(200, {
    description: 'Posiciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Posiciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Posiciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Posiciones>
  ): Promise<Posiciones> {
    return this.posicionesRepository.findById(id, filter);
  }

  @patch('/posiciones/{id}')
  @response(204, {
    description: 'Posiciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posiciones, {partial: true}),
        },
      },
    })
    posiciones: Posiciones,
  ): Promise<void> {
    await this.posicionesRepository.updateById(id, posiciones);
  }

  @put('/posiciones/{id}')
  @response(204, {
    description: 'Posiciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() posiciones: Posiciones,
  ): Promise<void> {
    await this.posicionesRepository.replaceById(id, posiciones);
  }

  @del('/posiciones/{id}')
  @response(204, {
    description: 'Posiciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.posicionesRepository.deleteById(id);
  }
}
