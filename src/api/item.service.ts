import ItemEntity, { Item } from '../domain/Item.entity';

export default class ItemService {
  public async getItems() {
    return ItemEntity.find().populate('resources');
  }

  public async getItemById(objectId: string) {
    return ItemEntity.findById(objectId);
  }

  public async createItem(body: Partial<Item>) {
    return ItemEntity.create(body);
  }
}
