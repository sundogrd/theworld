import World from './World';
import ItemDoc from './game/types/docs/ItemDoc';
import ItemTemplateDoc from './game/types/docs/ItemTemplateDoc';
import CreatureDoc from './game/types/docs/CreatureDoc';
import AttributeDoc from './game/types/docs/AttributeDoc';
import ActionDoc from './game/types/docs/ActionDoc';

type BundleContent = {
    items?: {
        [itemId: string]: ItemDoc;
    };
    i18n?: {
        // TODO: add i18n type
        [languageCode: string]: any;
    };
    itemTemplates?: {
        [templateId: string]: ItemTemplateDoc;
    };
    creatures?: {
        [creatureId: string]: CreatureDoc;
    };
    attributes: {
        [attributeKey: string]: AttributeDoc;
    };
    actions?: {
        [actionId: string]: ActionDoc;
    };
};

// 数组顺序
const bundleContents: Array<BundleContent> = [];

export type BundleItemRegistry = {};
export type BundleI18nRegistry = {};
export type BundleItemTemplateRegistry = {};
export type BundleCreatureRegsitry = {};
export type BundleCreatureTemplateRegistry = {};
export type BundleAttributeRegistry = {};
export type BundleActionRegistry = {};

const useBundle = (bundleName: string) => {
    const bundleContent = {
        items: {},
        i18n: {},
        itemTemplates: {},
        creatures: {},
        attributes: {},
        actions: {},
    };
    return {
        // 本来是想直接用Doc的，但Doc和注册的结构还不太一样，所以加了个Registry的概念，对Bundle开发者隔离Doc这个概念
        registerItem(itemRegistry: BundleItemRegistry) {},
        registerI18n(i18nRegistry: BundleI18nRegistry) {},
        registerItemTemplate(
            itemTemplateRegistry: BundleItemTemplateRegistry,
        ) {},
        registerCreature(creatureRegistry: BundleCreatureRegsitry) {},

        registerCreatureTemplate(
            creatureTemplateRegistry: BundleCreatureTemplateRegistry,
        ) {},

        registerAttribute(attributeRegistry: BundleAttributeRegistry) {},

        registerAction(actionRegistry: BundleActionRegistry) {},
    };
};
export { useBundle, bundleContents };
