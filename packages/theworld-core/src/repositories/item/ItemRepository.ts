import * as Datastore from "nedb";
import ContainerItem from "./ContainerItem";
import Item from "./Item";
import { EItemType, ItemDoc } from "../docs";

class ItemRepository {
    store: Datastore
    constructor(store: Datastore) {
        this.store = store
    }

    GetItemByID(id: string): Promise<Item> {
        return new Promise((resolve, reject): void => {
            this.store.find({id: id}, function(err: Error, doc: ItemDoc) {
                if(err) {
                    reject(err)
                    return
                }
                if(doc.type === EItemType.CONTAINER) {
                    resolve(new ContainerItem(doc))
                } else {
                    resolve(new Item(doc))
                }
            })
        })
    }

    SyncItem(item: Item): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.store.update({id: item.id}, item, { upsert: true }, (err: Error) => {
                if(err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

}

export default ItemRepository
