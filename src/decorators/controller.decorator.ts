import MetadataKeys from '../utils/metadataKeys';

const Controller =
  (basePath: string): ClassDecorator =>
  (target) =>
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);

export default Controller;
