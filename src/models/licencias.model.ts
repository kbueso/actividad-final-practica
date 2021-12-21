import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Licencias extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    default: 'liviana',
  })
  liviana?: string;

  @property({
    type: 'string',
    default: 'pesada',
  })
  pesada?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Licencias>) {
    super(data);
  }
}

export interface LicenciasRelations {
  // describe navigational properties here
}

export type LicenciasWithRelations = Licencias & LicenciasRelations;
