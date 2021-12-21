import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Rutas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  distancia?: number;

  @property({
    type: 'string',
  })
  lugar_inicio?: string;

  @property({
    type: 'string',
  })
  lugar_final?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Rutas>) {
    super(data);
  }
}

export interface RutasRelations {
  // describe navigational properties here
}

export type RutasWithRelations = Rutas & RutasRelations;
