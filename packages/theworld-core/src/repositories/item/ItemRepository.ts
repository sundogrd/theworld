import * as Datastore from "nedb";
import ContainerItem from "./ContainerItem";
import Item from "./Item";
import { EItemType, ItemDoc } from "../docs";

function isContainerItem(item: Item): item is ContainerItem {
    return item.type === EItemType.CONTAINER
}

class ItemRepository {
    store: Datastore
    constructor(store: Datastore) {
        this.store = store
    }

    getItemByID(id: string): Promise<Item> {
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

    syncItem(item: Item): Promise<void> {
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

    // add(item: ItemDoc): Promise<void> {
    //     return new Promise((resolve, reject): void => {
    //         this.store.insert(item, (err: Error) => {
    //             if(err) {
    //                 reject(err)
    //             } else {
    //                 resolve()
    //             }
    //         });
    //     })
    // }

    async remove(item: Item): Promise<void> {
        // if (item.carriedBy) {
        //     item.carriedBy.removeItem(item);
        // }

        if(isContainerItem(item)) {
            await Promise.all(item.inventory.map(childItem => this.remove(childItem)));
        }

        item.__pruned = true;
        item.removeAllListeners();
        return new Promise((resolve, reject): void => {
            this.store.remove({ id: item.id }, {}, function (err, numRemoved) {
                // numRemoved = 1
                if(err) {
                    reject(err)
                }
                resolve()
            });
        })
    }

      /**
       * @fires Item#updateTick
       */
    //   tickAll() {
    //     for (const item of this.items) {
    //       /**
    //        * @event Item#updateTick
    //        */
    //       item.emit('updateTick');
    //     }
    //   }

}

export default ItemRepository
