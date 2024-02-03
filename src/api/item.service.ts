import ItemEntity, { Item } from '../domain/Item.entity';
import { BadRequestError, NotFoundError } from '../utils/apiError';

export default class ItemService {
  public async getItems() {
    return await ItemEntity.find().populate('resources');
  }

  public async getItemById(objectId: string) {
    const item = await ItemEntity.findById(objectId);
    if (!item) throw new NotFoundError('Item does not exists');
    return item;
  }

  public async createItem(body: Partial<Item>) {
    const item = await ItemEntity.create(body);
    if (!item) throw new BadRequestError('Item could not be created');
    return item;
  }
}
