import * as Datastore from 'nedb';
import AttributeDoc from '../types/docs/AttributeDoc';

/**
 * 用于操作attribute数据库
 *
 * @class AttributeRepository
 */
class AttributeRepository {
    store: Datastore;
    constructor(store: Datastore) {
        this.store = store;
    }

    addAttribute(attributeDoc: AttributeDoc): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.store.insert(attributeDoc, function(
                err: Error,
                _doc: AttributeDoc,
            ) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    getAttributeById(id: string): Promise<AttributeDoc> {
        return new Promise((resolve, reject): void => {
            this.store.findOne({ id: id }, function(
                err: Error,
                doc: AttributeDoc,
            ) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(doc);
            });
        });
    }

    // 理论上不会使用
    removeAttributeById(attributeId: string): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.store.remove({ id: attributeId }, {}, function(
                err,
                _numRemoved,
            ) {
                // numRemoved = 1
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}

export default AttributeRepository;
