import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Resource } from './Resource.entity';

export class Item {
  @prop({ type: String, required: true })
  code: string;

  @prop({ type: String, required: true })
  name: string;

  @prop({ type: String, required: false })
  description: string;

  @prop({ type: String, required: false })
  unit: string;

  @prop({ type: Number, required: false, default: 0 })
  efficiency_mo: number;

  @prop({ type: Number, required: false, default: 0 })
  efficiency_eq: number;

  @prop({ type: Number, required: false, default: 0 })
  hours_man: number;

  @prop({ type: Number, required: false, default: 0 })
  quantity: number;

  @prop({ type: Number, required: false, default: 0 })
  unit_cost: number;

  @prop({ type: Number, required: false, default: 0 })
  total_cost: number;

  @prop({ type: Number, required: false, default: 0 })
  total_mo: number;

  @prop({ type: Number, required: false, default: 0 })
  total_mt: number;

  @prop({ type: Number, required: false, default: 0 })
  total_eq: number;

  @prop({ type: Number, required: false, default: 0 })
  total_sc: number;

  @prop({ type: Number, required: false, default: 0 })
  total_cs: number;

  @prop({ ref: () => Resource })
  resources: Ref<Resource>[];
}

const ItemEntity = getModelForClass(Item, {
  schemaOptions: { collection: 'items', timestamps: true },
});
export default ItemEntity;
