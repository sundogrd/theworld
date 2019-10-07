import * as Datastore from 'nedb';
import CreatureTemplateDoc from '../types/docs/CreatureTemplateDoc';

/**
 * 用于操作CreatureTemplate数据库
 *
 * @class CreatureRepository
 */
class CreatureTemplateRepository {
    store: Datastore;
    constructor(store: Datastore) {
        this.store = store;
    }

    addCreatureTemplate(creatureDoc: CreatureTemplateDoc): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.store.insert(creatureDoc, function(
                err: Error,
                _doc: CreatureTemplateDoc,
            ) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    getCreatureTemplateById(id: string): Promise<CreatureTemplateDoc> {
        return new Promise((resolve, reject): void => {
            this.store.find({ id: id }, function(
                err: Error,
                doc: CreatureTemplateDoc,
            ) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(doc);
            });
        });
    }
}

export default CreatureTemplateRepository;
