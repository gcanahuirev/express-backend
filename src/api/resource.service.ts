import ResourceEntity, { Resource } from '../domain/Resource.entity';
import { BadRequestError, NotFoundError } from '../utils/apiError';

export default class ResourceService {
  public async getResources() {
    return await ResourceEntity.find();
  }

  public async getResourceById(objectId: string) {
    const resource = await ResourceEntity.findById(objectId);
    if (!resource) throw new NotFoundError('Resource does not exists');
    return resource;
  }

  public async createResource(body: Partial<Resource>) {
    const resource = await ResourceEntity.create(body);
    if (!resource) throw new BadRequestError('Resource could not be created');
    return resource;
  }
}
