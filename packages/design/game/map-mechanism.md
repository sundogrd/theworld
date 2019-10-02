# 地图机制
地图机制是描述theworld世界中creature以及item所处位置的概念，theworld中地图由Area（维度类似与“长安城”、“长安郊外”等概念）组成，每个Area有自己的Map，Map用来描述Area中各个坐标具体的内容。Map则是由不同的tile（比如水、泥土、床）组成

## Area

```Typescript
// AreaDoc is just for storage
type AreaDoc = {
    // ...
}

type Tile = {
    type: string; // like 'water'
    position: {
        areaId: string;
        x: number;
        y: number;
        direction: EDirection;
    }
    placeable: boolean;
    moveable: boolean; // whether creature can move through the tile
    origin: string; // origin type if place by something, for restore if the thing remove.
    meta: any;
}

type AreaManager = {
    id: string,
    // trigger only when player is in this area
    onTimeUpdate: (world: World, area: Area) => Array<WorldUpdate> | null,
    // trigger only when player is in this area
    onCreatureLeave: (world: World, creature: Creature, target: Area) => void,
    // trigger only when player is in this area
    onCreatureDead: (world: World, creature: Creature) => void,
    // trigger when player is **not** in thie area, for Evolution of the area
    onIdle: (world: World, creature: Creature) => void,
}

type Area = {
    id: string,
    name: string,
    map: Array<Array<Tile | null>>,
    creatures: {
        [creatureId]: Creature,
    },
    items: {
        [itemId]: Item,
    },
    // where developer register logic into this place.
    areaManagers: Array<AreaManager>,
    meta: {
        [metaKey]: any;
    },
}

```

## Tile
Tile一个Area的组成部分，主要用来形成阻挡、让Creature判断行为逻辑（比如只有站在土上才能“种植”。

## AreaManager
AreaManager用来给开发者注册逻辑用的，

## Transport between Area
在Area之间的移动是通过Map中特殊的Tile实现的。
