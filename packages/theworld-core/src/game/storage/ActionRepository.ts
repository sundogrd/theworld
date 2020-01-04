import * as Datastore from 'nedb';
import ActionDoc from '../types/docs/ActionDoc';

/**
 * 用于操作Action数据库
 *
 * @class ActionRepository
 */
class ActionRepository {
    store: Datastore;
    constructor(store: Datastore) {
        this.store = store;
    }

    addAction(actionDoc: ActionDoc): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.store.insert(actionDoc, function(err: Error, _doc: ActionDoc) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    getActionById(id: string): Promise<ActionDoc> {
        return new Promise((resolve, reject): void => {
            this.store.findOne({ id: id }, function(
                err: Error,
                doc: ActionDoc,
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
    removeActionById(actionId: string): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.store.remove({ id: actionId }, {}, function(err, _numRemoved) {
                // numRemoved = 1
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}

export default ActionRepository;
