# Item
Item是theworld框架的基本组成，其存在与Creature的Inventory中的物品或掉落在Map中的物品，比如药水，食物，装备等。

## Item数据结构
```Typescript
enum ECreatureGender = {
    FEMALE = 'female'
    MALE = 'male'
}

type EDirection = {
    WEST: 'west';
    EAST: 'east';
    NORTH: 'north';
    SOUTH: 'south';
}

type InventoryDoc = {
    maxItem: number;
    itemIds: Array<string>;
}

type SkillStatus = {
    level: number;
    currentExp: number;
    nextLevelExp: number;
}

type ItemDoc = {
    id: string;
    name: string;
    description: string;
    // Array of body part
    equipable: Array<string>;
    template_id: string;
    meta: {
        [metaKey]: any;
    }
}

// 组合过后的Value Object
type Item = {
    //...
    toDoc: () => ItemDoc
}
```

## ItemTemplate
ItemTemplate
职责是是生成Item（输出Item），
传入world对象，source（{type: "system_generated", value: {}}）、

游戏中需要一种机制来负责Item的生成，比如世界初始化，地城或野外刷新Item，事件刷新、Creature生成，人物效果（打造、奖励）。等等。ItemTemplate则是在这种场景时候用来生成对应物品的模版，这个模版在加载时候就具有唯一id（也即bundle根据加载顺序不同可覆盖）。
```Typescript
type Source = {
    type: ECreateSource;
    payload: any;
}

interface ItemTemplate {
    id: string;
    name: string; // like rat_template
    create: (world: World, source: Source) => ItemTemplate
}
```

