import * as Datastore from "nedb";
import ItemDoc from "../types/docs/ItemDoc";

// function isContainerItem(item: Item): item is ContainerItem {
//     return item.type === EItemType.CONTAINER
// }

/**
 * 用于操作item数据库
 *
 * @class ItemRepository
 */
class ItemRepository {
    store: Datastore
    constructor(store: Datastore) {
        this.store = store
    }

    addItem(itemDoc: ItemDoc): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.store.insert(itemDoc, function(err: Error, _doc: ItemDoc) {
                if(err) {
                    reject(err)
                    return
                }
                resolve()
            })
        })
    }

    getItemById(id: string): Promise<ItemDoc> {
        return new Promise((resolve, reject): void => {
            this.store.find({id: id}, function(err: Error, doc: ItemDoc) {
                if(err) {
                    reject(err)
                    return
                }
                resolve(doc)
            })
        })
    }

    updateItem(query: any, update: any): Promise<{numAffected: number, affectedDocuments: any, upsert: boolean}> {
        return new Promise((resolve, reject): void => {
            this.store.update(query, update, { returnUpdatedDocs: true },function(err: Error, numberOfUpdated: number, affectedDocuments: any, upsert: boolean) {
                // numRemoved = 1
                if(err) {
                    reject(err)
                }
                resolve({
                    numAffected: numberOfUpdated,
                    affectedDocuments: affectedDocuments,
                    upsert: upsert,
                })
            });
        })
    }

    removeItemById(itemId: string): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.store.remove({ id: itemId }, {}, function (err, _numRemoved) {
                // numRemoved = 1
                if(err) {
                    reject(err)
                }
                resolve()
            });
        })
    }
}

export default ItemRepository
