import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculos} from './vehiculos.model';

@model({settings: {strict: false}})
export class Tipovehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    default: 'pickup',
  })
  pickup?: string;

  @property({
    type: 'string',
    default: 'camion',
  })
  camion?: string;

  @belongsTo(() => Vehiculos)
  vehiculosId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tipovehiculo>) {
    super(data);
  }
}

export interface TipovehiculoRelations {
  // describe navigational properties here
}

export type TipovehiculoWithRelations = Tipovehiculo & TipovehiculoRelations;
