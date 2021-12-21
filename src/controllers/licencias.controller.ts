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
import {Licencias} from '../models';
import {LicenciasRepository} from '../repositories';

@authenticate('jwt')
export class LicenciasController {
  constructor(
    @repository(LicenciasRepository)
    public licenciasRepository: LicenciasRepository,
  ) { }

  @post('/licencias')
  @response(200, {
    description: 'Licencias model instance',
    content: {'application/json': {schema: getModelSchemaRef(Licencias)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Licencias, {
            title: 'NewLicencias',
            exclude: ['id'],
          }),
        },
      },
    })
    licencias: Omit<Licencias, 'id'>,
  ): Promise<Licencias> {
    return this.licenciasRepository.create(licencias);
  }

  @get('/licencias/count')
  @response(200, {
    description: 'Licencias model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Licencias) where?: Where<Licencias>,
  ): Promise<Count> {
    return this.licenciasRepository.count(where);
  }

  @get('/licencias')
  @response(200, {
    description: 'Array of Licencias model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Licencias, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Licencias) filter?: Filter<Licencias>,
  ): Promise<Licencias[]> {
    return this.licenciasRepository.find(filter);
  }

  @patch('/licencias')
  @response(200, {
    description: 'Licencias PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Licencias, {partial: true}),
        },
      },
    })
    licencias: Licencias,
    @param.where(Licencias) where?: Where<Licencias>,
  ): Promise<Count> {
    return this.licenciasRepository.updateAll(licencias, where);
  }

  @get('/licencias/{id}')
  @response(200, {
    description: 'Licencias model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Licencias, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Licencias, {exclude: 'where'}) filter?: FilterExcludingWhere<Licencias>
  ): Promise<Licencias> {
    return this.licenciasRepository.findById(id, filter);
  }

  @patch('/licencias/{id}')
  @response(204, {
    description: 'Licencias PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Licencias, {partial: true}),
        },
      },
    })
    licencias: Licencias,
  ): Promise<void> {
    await this.licenciasRepository.updateById(id, licencias);
  }

  @put('/licencias/{id}')
  @response(204, {
    description: 'Licencias PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() licencias: Licencias,
  ): Promise<void> {
    await this.licenciasRepository.replaceById(id, licencias);
  }

  @del('/licencias/{id}')
  @response(204, {
    description: 'Licencias DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.licenciasRepository.deleteById(id);
  }
}
