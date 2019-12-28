import * as Datastore from 'nedb';
import * as path from 'path';
import * as fse from 'fs-extra';
import ELanguageCode from './game/types/i18n/LanguageCode';
import ItemDoc from './game/types/docs/ItemDoc';
import { ItemRegistry } from './game/types/registry/ItemRegistry';
import ItemTemplateRegistry from './game/types/registry/ItemTemplateRegistry';
import ItemTemplateDoc from './game/types/docs/ItemTemplateDoc';
import CreatureRegistry from './game/types/registry/CreatureRegistry';
import CreatureDoc from './game/types/docs/CreatureDoc';
import CreatureTemplateDoc from './game/types/docs/CreatureTemplateDoc';
import CreatureTemplateRegistry from './game/types/registry/CreatureTemplateRegistry';
import AttributeRegistry from './game/types/registry/AttributeRegistry';
import AttributeDoc from './game/types/docs/AttributeDoc';
import ActionRegistry from './game/types/registry/ActionRegistry';
import AreaRegistry from './game/types/registry/AreaRegistry';
import ActionDoc from './game/types/docs/ActionDoc';

// Loader for load resource for game

class BundleLoader {
    worldDir: string;
    db: {
        i18n: Datastore;
        items: Datastore;
        creatures: Datastore;
        areas: Datastore;
        itemTemplates: Datastore;
        creatureTemplates: Datastore;
        actions: Datastore;
        attributes: Datastore;
    };
    constructor(worldDir: string) {
        this.worldDir = worldDir;
        fse.removeSync(path.resolve(this.worldDir, './i18n.db'));
        fse.removeSync(path.resolve(this.worldDir, './items.db'));
        fse.removeSync(path.resolve(this.worldDir, './creatures.db'));
        fse.removeSync(path.resolve(this.worldDir, './areas.db'));
        fse.removeSync(path.resolve(this.worldDir, './itemTemplates.db'));
        fse.removeSync(path.resolve(this.worldDir, './creatureTemplates.db'));
        fse.removeSync(path.resolve(this.worldDir, './actions.db'));
        fse.removeSync(path.resolve(this.worldDir, './attributes.db'));
        this.db = {
            i18n: new Datastore({
                filename: path.resolve(this.worldDir, './i18n.db'),
                autoload: true,
            }),
            items: new Datastore({
                filename: path.resolve(this.worldDir, './items.db'),
                autoload: true,
            }),
            creatures: new Datastore({
                filename: path.resolve(this.worldDir, './creatures.db'),
                autoload: true,
            }),
            areas: new Datastore({
                filename: path.resolve(this.worldDir, './areas.db'),
                autoload: true,
            }),
            itemTemplates: new Datastore({
                filename: path.resolve(this.worldDir, './itemTemplates.db'),
                autoload: true,
            }),
            creatureTemplates: new Datastore({
                filename: path.resolve(this.worldDir, './creatureTemplates.db'),
                autoload: true,
            }),
            actions: new Datastore({
                filename: path.resolve(this.worldDir, './actions.db'),
                autoload: true,
            }),
            attributes: new Datastore({
                filename: path.resolve(this.worldDir, './attributes.db'),
                autoload: true,
            }),
        };
    }

    public async loadBundle(bundlePkg: string): Promise<void> {
        const bundleDirPath = `${this.worldDir}/bundle-packages/${bundlePkg}`;
        // check dir path
        await fse.access(bundleDirPath);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const pkg = require(`${bundleDirPath}/index.js`);
        if (!pkg.init) {
            throw new Error(`package ${bundlePkg} hasn't 'init' method`);
        }
        await pkg.init({
            loadI18n: this.loadI18n.bind(this),
            loadItem: this.loadItem.bind(this),
            loadArea: this.loadArea.bind(this),
            loadItemTemplate: this.loadItemTemplate.bind(this),
            loadCreature: this.loadCreature.bind(this),
            loadCreatureTemplate: this.loadCreatureTemplate.bind(this),
            loadAction: this.loadAction.bind(this),
            loadAttribute: this.loadAttribute.bind(this),
        });
    }

    private async loadI18n(
        languageCode: ELanguageCode,
        keyMap: Record<string, string>,
    ): Promise<void> {
        // 异步insert所有i18n的key
        await Promise.all(
            Object.keys(keyMap).map(i18nKey => {
                return new Promise((resolve, reject) => {
                    this.db.i18n.insert(
                        {
                            key: i18nKey,
                            languageCode: languageCode,
                            value: keyMap[i18nKey],
                        },
                        err => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve();
                        },
                    );
                });
            }),
        );
    }
    private loadArea(_areaRegistry: AreaRegistry): Promise<void> {
        throw new Error('not implemented');
    }
    private loadItem(itemRegistry: ItemRegistry): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.itemTemplates.findOne(
                { id: itemRegistry.templateId },
                (err, doc: ItemTemplateDoc) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (doc === null) {
                        reject(
                            new Error(
                                `no template for templateId ${itemRegistry.templateId}`,
                            ),
                        );
                        return;
                    }
                    this.db.items.insert(
                        {
                            id: itemRegistry.id,
                            name: itemRegistry.name,
                            description: itemRegistry.description,
                            equipable: doc.equipable,
                            templateId: itemRegistry.templateId,
                            meta: itemRegistry.meta,
                        } as ItemDoc,
                        err => {
                            if (err) {
                                reject();
                                return;
                            }
                            resolve();
                        },
                    );
                },
            );
        });
    }
    private loadItemTemplate(
        itemTemplateRegistry: ItemTemplateRegistry,
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.itemTemplates.insert(
                {
                    id: itemTemplateRegistry.id,
                    name: itemTemplateRegistry.name,
                    equipable: itemTemplateRegistry.equipable,
                    createScript: itemTemplateRegistry.create.toString(),
                } as ItemTemplateDoc,
                err => {
                    if (err) {
                        reject();
                        return;
                    }
                    resolve();
                },
            );
        });
    }
    private loadCreature(creatureRegistry: CreatureRegistry): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.creatureTemplates.findOne(
                { id: creatureRegistry.templateId },
                (err: Error, doc: CreatureTemplateDoc) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (doc === null) {
                        reject(
                            new Error(
                                `no template for templateId ${creatureRegistry.templateId}`,
                            ),
                        );
                        return;
                    }
                    this.db.creatures.insert(
                        {
                            id: creatureRegistry.id,
                            name: creatureRegistry.name,
                            description: creatureRegistry.name,
                            gender: creatureRegistry.gender,
                            race: doc.race,
                            inventory: creatureRegistry.inventory,
                            equipment: {},
                            templateId: creatureRegistry.templateId,
                            state: '',
                            position: creatureRegistry.position,
                            attributes: creatureRegistry.attributes,
                            isAlive: true,
                            thinkScript: creatureRegistry.think.toString(),
                            nextTurn: 0,
                            meta: creatureRegistry.meta,
                        } as CreatureDoc,
                        err => {
                            if (err) {
                                reject();
                                return;
                            }
                            resolve();
                        },
                    );
                },
            );
        });
    }
    private loadCreatureTemplate(
        creatureTemplateRegistry: CreatureTemplateRegistry,
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.creatureTemplates.insert(
                {
                    id: creatureTemplateRegistry.id,
                    name: creatureTemplateRegistry.name,
                    race: creatureTemplateRegistry.race,
                    createScript: creatureTemplateRegistry.create.toString(),
                } as CreatureTemplateDoc,
                err => {
                    if (err) {
                        reject();
                        return;
                    }
                    resolve();
                },
            );
        });
    }
    private loadAttribute(attributeRegistry: AttributeRegistry): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.attributes.insert(
                {
                    key: attributeRegistry.key,
                    name: attributeRegistry.name,
                    formula: {
                        requires: attributeRegistry.formula.requires,
                        metadata: attributeRegistry.formula.metadata,
                        fnScript: attributeRegistry.formula.fn.toString(),
                    },
                } as AttributeDoc,
                err => {
                    if (err) {
                        reject();
                        return;
                    }
                    resolve();
                },
            );
        });
    }
    private loadAction(actionRegistry: ActionRegistry): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.actions.insert(
                {
                    id: actionRegistry.id,
                    name: actionRegistry.name,
                    timeSpendScript: actionRegistry.timeSpend.toString(),
                    checkScript: actionRegistry.check.toString(),
                    doScript: actionRegistry.do.toString(),
                } as ActionDoc,
                err => {
                    if (err) {
                        reject();
                        return;
                    }
                    resolve();
                },
            );
        });
    }
}

export default BundleLoader;
