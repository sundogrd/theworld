import * as Datastore from 'nedb';
import CreatureDoc from '../types/docs/CreatureDoc';

/**
 * 用于操作creature数据库
 *
 * @class CreatureRepository
 */
class CreatureRepository {
    store: Datastore;
    constructor(store: Datastore) {
        this.store = store;
    }

    addCreature(creatureDoc: CreatureDoc): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.store.insert(creatureDoc, function(
                err: Error,
                _doc: CreatureDoc,
            ) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    getCreatureById(id: string): Promise<CreatureDoc> {
        return new Promise((resolve, reject): void => {
            this.store.findOne({ id: id }, function(
                err: Error,
                doc: CreatureDoc,
            ) {
                if (err || !doc) {
                    reject(err || new Error('No creature exist'));
                    return;
                }
                resolve(doc);
            });
        });
    }

    mgetCreatureByIds(
        ids: Array<string>,
    ): Promise<{ [creatureId: string]: CreatureDoc }> {
        return new Promise((resolve, reject): void => {
            this.store.find({ id: { $in: ids } }, function(
                err: Error,
                docs: Array<CreatureDoc>,
            ) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(
                    docs.reduce(
                        (prev, curr) => {
                            prev[curr.id] = curr;
                            return prev;
                        },
                        {} as { [creatureId: string]: CreatureDoc },
                    ),
                );
            });
        });
    }

    updateCreature(
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

    removeCreatureById(creatureId: string): Promise<void> {
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

export default CreatureRepository;
