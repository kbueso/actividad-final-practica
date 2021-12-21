import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Recorridos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  asignacion: string;

  @property({
    type: 'number',
  })
  calcularruta?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Recorridos>) {
    super(data);
  }
}

export interface RecorridosRelations {
  // describe navigational properties here
}

export type RecorridosWithRelations = Recorridos & RecorridosRelations;
