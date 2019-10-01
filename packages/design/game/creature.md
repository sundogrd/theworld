# Creature
Creature是theworld框架的基本组成，其代表生物，比如怪物、NPC、玩家都属于生物。

## Creature数据结构
一个生物在游戏中的“数据”结构如下
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

type CreatureDoc = {
    id: string;
    name: string;
    description: string;
    gender: ECreatureGender;
    race: string;
    inventory: InventoryDoc;
    equipment: {
        // bodyPart' value is item id
        [bodyPart: string]: string | null;
    },
    templateId: string;
    position: {
        areaId: string;
        x: number;
        y: number;
        direction: EDirection;
    },
    skills: {
        [skillId]: SkillStatus;
    },
    attributes: {
        [attributeKey]: Attribute;
    },
    active: (world: World, player: Creature, me: Creature) => void
    meta: {
        [metaKey]: any;
    }
}

// 组合过后的Value Object
type Creature = {
    //...
    toDoc: () => CreatureDoc
}
```

## CreatureTemplate
游戏中需要一种机制来负责Creature的生成，比如世界初始化，地城或野外刷新生物，事件刷新等等。CreatureTemplate则是在这种场景时候用来生成对应生物的模版，这个模版在加载时候就具有唯一id。
```Typescript
type Source = {
    type: ECreateSource;
    payload: any;
}

interface CreatureTemplate {
    id: string;
    name: string; // like rat_template
    create: (world: World, source: Source) => Creature
}
```



# 老文档备份
# Character设计
Character指的角色，角色即可以是唯一角色（Unique Character）也可以是生成角色（Generated Character），游戏中所有可交互、可移动的实体都是Character（包括可能有的怪物以及普通人）


## 唯一角色和生成角色
引擎为了提高角色的个性以及游戏的随机性和多样性，分别设计了**唯一角色**和**生成角色**，其在游戏内都是Character实体，但引擎为唯一角色提供了更多的可配置项同时不可销毁，生成角色则是通过特定模版生成的角色。

### 实现机制（脚本层）
对于mod开发者以及引擎脚本开发者层面，Character部分主要存放于game/character下
```
./game/character
├── 100_Torres
├── 1_lwio
└── factory
```
根目录下`编号_名字`文件夹指的是唯一角色，根目录下`factory`中存放生成角色的"工厂"。

#### 唯一角色


#### 生成角色工厂

### 实现机制（引擎层）
