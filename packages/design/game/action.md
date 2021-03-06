# Action设计
Action主要用于定义Character的行为，Action具有Target而且是可选，Target可能是Item也可以是Character，可以表示"冥想"、"攻击"、"向北走"。也可以理解为Command。

## Action数据结构
```Typescript
type Action = {
    id: string;
    name: string;
    timeSpend: (world?: World, me?: Creature, target?: Item | Creature) => number;
    check: (world: World, me: Creature, target?: Item | Creature) => boolean;
    do: (world: World, me: Creature, target?: Item | Creature) => Array<WorldUpdate> | null;
}
```

## 内置Action
### turnWest
```Typescript
const turnNorth = {
    id: "turn-north",
    name: "${turn-north}" // for i18n
    timeSpend: () => 1
    check: () => true
    do: () => {
        return [{
            type: "creature-change",
            payload: {
                position: {
                    direction: "north";
                },
            }
        }]
    }
}
export default turnLeft
```
