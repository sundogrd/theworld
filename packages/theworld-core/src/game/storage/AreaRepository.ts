import * as Datastore from 'nedb';
import AreaDoc from '../types/docs/AreaDoc';

/**
 * 用于操作area数据库
 *
 * @class AreaRepository
 */
class AreaRepository {
    store: Datastore;
    constructor(store: Datastore) {
        this.store = store;
    }

    addArea(creatureDoc: AreaDoc): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.store.insert(creatureDoc, function(err: Error, _doc: AreaDoc) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

getAreaById(id: string): Promise<AreaDoc> {
        return new Promise((resolve, reject): void => {
            this.store.findOne({ id: id }, function(err: Error, doc: AreaDoc) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(doc);
            });
        });
    }

    getAllAreas(): Promise<AreaDoc[]> {
        return new Promise((resolve, reject): void => {
            this.store.find({}, function(err: Error, docs: AreaDoc[]) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(docs);
            });
        });
    }

    updateArea(
        query: any,
        update: any,
    ): Promise<{ numAffected: number; affectedDocuments: any }> {
        return new Promise((resolve, reject): void => {
            this.store.update(
                query,
                update,
                { returnUpdatedDocs: true, upsert: false },
                function(
                    err: Error,
                    numberOfUpdated: number,
                    affectedDocuments: any,
                ) {
                    // numRemoved = 1
                    if (err) {
                        reject(err);
                    }
                    resolve({
                        numAffected: numberOfUpdated,
                        affectedDocuments: affectedDocuments,
                    });
                },
            );
        });
    }

    removeAreaById(creatureId: string): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.store.remove({ id: creatureId }, {}, function(
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

export default AreaRepository;
