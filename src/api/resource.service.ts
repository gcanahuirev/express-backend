import ResourceEntity, { Resource } from '../domain/Resource.entity';

export default class ResourceService {
  public async getResources() {
    return ResourceEntity.find();
  }

  public async getResourceById(objectId: string) {
    return ResourceEntity.findById(objectId);
  }

  public async createResource(body: Partial<Resource>) {
    return ResourceEntity.create(body);
  }
}
