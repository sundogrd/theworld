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
        this.db.i18n = new Datastore({
            filename: path.resolve(this.worldDir, './i18n.db'),
            autoload: true,
        });
        this.db.items = new Datastore({
            filename: path.resolve(this.worldDir, './items.db'),
            autoload: true,
        });
        this.db.creatures = new Datastore({
            filename: path.resolve(this.worldDir, './creatures.db'),
            autoload: true,
        });
        this.db.areas = new Datastore({
            filename: path.resolve(this.worldDir, './areas.db'),
            autoload: true,
        });

        this.db.itemTemplates = new Datastore({
            filename: path.resolve(this.worldDir, './itemTemplates.db'),
        });

        this.db.creatureTemplates = new Datastore({
            filename: path.resolve(this.worldDir, './creatureTemplates.db'),
        });
        this.db.actions = new Datastore({
            filename: path.resolve(this.worldDir, './actions.db'),
        });
        this.db.attributes = new Datastore({
            filename: path.resolve(this.worldDir, './attributes.db'),
        });
    }

    public async loadBundle(bundlePkg: string): Promise<void> {
        const bundleDirPath = `${this.worldDir}/bundle-packages/${bundlePkg}`;
        // check dir path
        await fse.access(bundleDirPath);
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
                            key: 'i18nKey',
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
    private loadItem(itemRegistry: ItemRegistry): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.itemTemplates.findOne(
                { id: itemRegistry.templateId },
                (err, doc: ItemTemplateDoc) => {
                    if (err) {
                        reject(err);
                    }
                    if (doc === null) {
                        reject(
                            new Error(
                                `no template for templateId ${itemRegistry.templateId}`,
                            ),
                        );
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
                    }
                    if (doc === null) {
                        reject(
                            new Error(
                                `no template for templateId ${creatureRegistry.templateId}`,
                            ),
                        );
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
