/* eslint-disable @typescript-eslint/camelcase */
import ItemDoc from './game/types/docs/ItemDoc';
import ItemTemplateDoc from './game/types/docs/ItemTemplateDoc';
import CreatureDoc from './game/types/docs/CreatureDoc';
import AttributeDoc from './game/types/docs/AttributeDoc';
import ActionDoc from './game/types/docs/ActionDoc';
import { ItemRegistry } from './game/types/registry/ItemRegistry';
import I18nRegistry from './game/types/registry/I18nRegistry';
import ItemTemplateRegistry from './game/types/registry/ItemTemplateRegistry';
import CreatureRegistry from './game/types/registry/CreatureRegistry';
import CreatureTemplateRegistry from './game/types/registry/CreatureTemplateRegistry';
import AttributeRegistry from './game/types/registry/AttributeRegistry';
import ActionRegistry from './game/types/registry/ActionRegistry';
import CreatureTemplateDoc from './game/types/docs/CreatureTemplateDoc';

type BundleHookScript = (bundle: Bundle, helper: any) => void;

enum EBundleHook {
    AfterLoaded = 'afterLoaded',
}

type BundleDescriptor = {
    version: string; // 0.0.1
    requires: {
        [bundle: string]: string; // "fantasy-base-bundle": "^0.0.1"
    };
};

class Bundle {
    items: {
        [itemId: string]: ItemDoc;
    } = {};
    i18n: {
        // TODO: add i18n type
        [languageCode: string]: I18nRegistry;
    } = {};
    itemTemplates: {
        [templateId: string]: ItemTemplateDoc;
    } = {};
    creatures: {
        [creatureId: string]: CreatureDoc;
    } = {};
    creatureTemplates: {
        [templateId: string]: CreatureTemplateDoc;
    } = {};
    attributes: {
        [attributeKey: string]: AttributeDoc;
    } = {};
    actions: {
        [actionId: string]: ActionDoc;
    } = {};
    hooksScripts: {
        [phase: string]: Array<BundleHookScript>;
    } = {
        afterLoaded: [],
    };

    private descriptor: BundleDescriptor;

    constructor(bundleDescriptor: BundleDescriptor) {
        this.descriptor = bundleDescriptor;
    }

    // 本来是想直接用Doc的，但Doc和注册的结构还不太一样，所以加了个Registry的概念，对Bundle开发者隔离Doc这个概念
    public registerItem(itemRegistry: ItemRegistry): void {
        if (this.items[itemRegistry.id]) {
            throw new Error('item has already been registered');
        }
        this.items[itemRegistry.id] = {
            id: itemRegistry.id,
            name: itemRegistry.name,
            description: itemRegistry.description,
            // Array of body part
            equipable: itemRegistry.equipable,
            template_id: itemRegistry.template_id,
            meta: itemRegistry.meta,
        };
    }
    public registerI18n(i18nRegistry: I18nRegistry): void {
        if (this.i18n[i18nRegistry.languageCode]) {
            throw new Error('i18n for this bundle has already been registered');
        }
        this.i18n[i18nRegistry.languageCode] = {
            languageCode: i18nRegistry.languageCode,
            texts: i18nRegistry.texts,
        };
    }
    public registerItemTemplate(
        itemTemplateRegistry: ItemTemplateRegistry,
    ): void {
        if (this.itemTemplates[itemTemplateRegistry.id]) {
            throw new Error('itemTemplate has already been registered');
        }
        this.itemTemplates[itemTemplateRegistry.id] = {
            id: itemTemplateRegistry.id,
            name: itemTemplateRegistry.name, // like sword_template
            createScript: itemTemplateRegistry.create.toString(),
        };
    }
    public registerCreature(creatureRegistry: CreatureRegistry): void {
        if (this.creatures[creatureRegistry.id]) {
            throw new Error('creature has already been registered');
        }
        this.creatures[creatureRegistry.id] = {
            id: creatureRegistry.id,
            name: creatureRegistry.name,
            description: creatureRegistry.description,
            gender: creatureRegistry.gender,
            race: creatureRegistry.race,
            inventory: {
                maxItem: creatureRegistry.inventory.maxItem,
                itemIds: [],
            },
            equipment: {},
            templateId: creatureRegistry.templateId,
            state: 'thinking',
            position: {
                areaId: creatureRegistry.position.areaId,
                x: creatureRegistry.position.x,
                y: creatureRegistry.position.y,
                direction: creatureRegistry.position.direction,
            },
            attributes: creatureRegistry.attributes,
            isAlive: creatureRegistry.isAlive,
            thinkScript: creatureRegistry.think.toString(),
            nextTurn: 0,
            meta: creatureRegistry.meta,
        };
    }

    public registerCreatureTemplate(
        creatureTemplateRegistry: CreatureTemplateRegistry,
    ): void {
        if (this.creatureTemplates[creatureTemplateRegistry.id]) {
            throw new Error('creatureTemplate has already been registered');
        }
        this.creatureTemplates[creatureTemplateRegistry.id] = {
            id: creatureTemplateRegistry.id,
            name: creatureTemplateRegistry.name,
            createScript: creatureTemplateRegistry.create.toString(),
        };
    }

    public registerAttribute(attributeRegistry: AttributeRegistry): void {
        if (this.attributes[attributeRegistry.name]) {
            throw new Error(
                `attribute ${attributeRegistry.name} has already been registered`,
            );
        }
        this.attributes[attributeRegistry.name] = {
            key: attributeRegistry.key,
            name: attributeRegistry.name,
            formula: {
                // 'requires' specifies which attributes the formula depends on for its
                // calculation. You may depend on attributes defined in a different bundle.
                requires: attributeRegistry.formula.requires,

                metadata: attributeRegistry.formula.metadata,
                fnScript: attributeRegistry.formula.fn.toString(),
            },
        };
    }

    public registerAction(actionRegistry: ActionRegistry): void {
        if (this.actions[actionRegistry.id]) {
            throw new Error(
                `action '${actionRegistry.id}' has already been registered`,
            );
        }
        this.actions[actionRegistry.id] = {
            id: actionRegistry.id,
            name: actionRegistry.name,
            timeSpendScript: actionRegistry.timeSpend.toString(), // (world?: GameWorld, me?: Creature, target?: Item | Creature | Tile) => number;
            checkScript: actionRegistry.check.toString(), // (world: GameWorld, me: Creature, target?: Item | Creature | Tile) => boolean;
            doScript: actionRegistry.do.toString(), // (world: GameWorld, me: Creature, target?: Item | Creature | Tile) => Array<GameWorldUpdate> | null;
        };
    }

    // 用于bundle加载过程中的hook，包括World部分时候
    public onHook(hook: EBundleHook, scriptFunc: BundleHookScript): void {
        this.hooksScripts[hook].push(scriptFunc);
    }
}

export default Bundle;
