import { prop, getModelForClass } from '@typegoose/typegoose';

export class Resource {
  @prop({ type: String, required: true })
  code: string;

  @prop({ type: String, required: false })
  description: string;

  @prop({ type: String, required: false, default: 0 })
  unit: string;

  @prop({ type: String, required: true })
  type_resource: string;

  @prop({ type: Number, required: false, default: 0 })
  unit_cost: number;

  @prop({ type: Number, required: true })
  project_id: number;
}

const ResourceEntity = getModelForClass(Resource, {
  schemaOptions: { collection: 'resources', timestamps: true },
});
export default ResourceEntity;
