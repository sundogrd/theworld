import * as Datastore from "nedb";
import ItemTemplateDoc from "../types/docs/ItemTemplateDoc";

/**
 * 用于操作ItemTemplate数据库
 *
 * @class ItemRepository
 */
class ItemTemplateRepository {
    store: Datastore
    constructor(store: Datastore) {
        this.store = store
    }

    addItemTemplate(itemDoc: ItemTemplateDoc): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.store.insert(itemDoc, function(err: Error, _doc: ItemTemplateDoc) {
                if(err) {
                    reject(err)
                    return
                }
                resolve()
            })
        })
    }

    getItemTemplateById(id: string): Promise<ItemTemplateDoc> {
        return new Promise((resolve, reject): void => {
            this.store.find({id: id}, function(err: Error, doc: ItemTemplateDoc) {
                if(err) {
                    reject(err)
                    return
                }
                resolve(doc)
            })
        })
    }
}

export default ItemTemplateRepository
