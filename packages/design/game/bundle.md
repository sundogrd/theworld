# Bundle
bundle是theworld中实际游戏的逻辑，theworld本身只提供了框架及机制，并不包含任何核心的“玩法”，所有的这一切都是由bundle实现的。可以理解bundle就是其他游戏中mod这一概念。

Bundle本质上是一个文件夹（后期提供npm包机制），其文件夹结构如下

* root
  * areas
    * death-core
      * index.js
  * creatures
    * templates
      * rat-template.js
    * creatures
      * rat
        * index.js
  * items
    * templates
      * trainning-sword-template.js
    * items
      * trainning-sword
        * index.js
  * actions
    * turn-north
      * index.js
  * attributes
    * magic-power
      * index.js
  * i18n
    * en
    * zh_hans
    * zh_hant
    * index.js
* index.js

## index.js
index是bundle的入口，里面包含了一些注册逻辑，比如为某个area注册areaManager，以及后面的一些扩展。theworld基于“默认大于配置“的思想提供了一个默认的index，其会按照文件夹结构注册和加载对应的内容，当然你也可以直接基于底层API直接调用`Bundle.registerItem`等方法手动注册。
```Javascript
const Bundle = require('theworld-core').Bundle

Bundle.registerItem()

```

## areas
一个包含areas的bundle会在其areas文件夹中添加多个js文件（脚本），每个脚本包含内容如下

```Javascript
const defaultAreaManager = {
    id: string,
    // trigger only when player is in this area
    onTimeUpdate: (world: GameWorld, area: Area) => Array<GameWorldUpdate> | null,
    // trigger only when player is in this area
    onCreatureLeave: (world: GameWorld, creature: Creature, target: Area) => Array<GameWorldUpdate> | null,
    // trigger only when player is in this area
    onCreatureDead: (world: GameWorld, creature: Creature) => Array<GameWorldUpdate> | null,
    // trigger when player is **not** in thie area, for Evolution of the area
    onIdle: (world: GameWorld, creature: Creature) => Array<GameWorldUpdate> | null,
}

module.exports = {
  id: "death-land",
  name: "${deathLand}", // or you can just type 'Death Land', but it will not get benefit from i18n mechanism.
  map: [
    [],
    [],
  ],
  creatures: {
      [creatureId: string]: CreatureDoc,
  },
  items: {
      [itemId: string]: ItemDoc,
  },
  // where developer register logic into this place.
  areaManagers: [defaultAreaManager],
  meta: {
      [metaKey: string]: any;
  },
  // run when bundle's area loaded
  init: (world: GameWorld) => {

  }
}
```

> 在使用“默认大于配置”生成的index.js时，只需要将文件按格式放置在areas文件夹下就可以

## creatures
一个包含creatures的bundle会在其creatures文件夹中添加多个js文件（脚本），每个脚本包含内容如下

```Javascript
const Bundle = require("theworld-core").Bundle
const keyboard = Bundle.createItem(Bundle.getItemTemplate("keyboard"))
const macbook = Bundle.createItem(Bundle.getItemTemplate("macbook"))

module.exports = {
    id: "lwio", // one of the author's nickname
    name: "${lwio}",
    description: "one of the founder of theworld and sundog",
    gender: "male",
    race: "human",
    inventory: {
        maxItem: 50,
        items: {
            [macbook.id]: macbook,
        }
    },
    equipment: {
        "right-hand": keyboard, // using keyboard to hit :)
    },
    templateId: null,
    state: "thinking", // 保留，智能状态机 state machine
    position: {
        areaId: "zhongweitong",
        x: 0,
        y: 0,
        direction: "south",
    },
    attributes: {
        "magic-power": 400,
    },
    isAlive: true, // false if the creature is dead. :)
    think: (world, player, me) => {
        if(me.isAlive) {
            return {
              actionId: "think",
            }
        }
    },
    meta: {
        "isGod": true
    }
}
```

## items
一个包含items的bundle会在其items文件夹中添加多个js文件（脚本），每个脚本包含内容如下

```Javascript
module.exports = {
    id: "macbook-pro";
    name: "Macbook Pro";
    description: "the production tool for lwio";
    // Array of body part
    equipable: ["right-hand", "left-hand"];
    template_id: null;
    meta: {
        remainPower: 100,
    }
}
```

## actions
bundle可以对action（creature的行为）进行扩展。 // TODO: 那扩展了的action如何让creature的think能够应用？这个机制需要思考下。

```Javascript
module.exports = {
    id: "turn-north",
    name: "${turn-north}", // for i18n
    timeSpend: () => 1,
    check: () => true,
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
```


## attributes

```Javascript
module.exports = {
  name: 'mana',
  base: 10,
  formula: {
    requires: ['intellect'],

    metadata: {
      levelMultiplier: 0.33,
    },
    fn: function (creature, currentValue, dependencies) {
      // Using the example formula from before:
      return Math.floor(
        currentValue +
        dependencies.intellect +
        // to access the `metadata` inside the formula use `this.metadata`
        creature.meta.level * this.metadata.levelMultiplier
      );
    }
  },
  // how about some creature don't have this attribute in their definition
  fallback: (creature) => {
    if (creature.meta.intellect) {
      return creature.meta.intellect * 10
    }
    return 100
  }
}
```

## i18n
i18n指的是international，主要是为了提供多语言支持的包，其index.js是使用theworld-dev-cli自动生成的文件（包括模版提取），其他开发者或者翻译者提交自己的翻译文件到对应语言的文件夹下。

> theworld 使用 iso_639_1 的 language codes 规范，对于中文简体繁体这种情况，使用下划线zh_hans(简体)，zh_hant（繁体）

```Javascript
// index.js
const Bundle = require("theworld-core").Bundle
const zhHans = require("./zh_hans")
const zhHant = require("./zh_hant")
const en = require("./en")

Bundle.registerI18n("zh_hans", zhHans)
Bundle.registerI18n("zh_hant", zhHant)
Bundle.registerI18n("en", en)
```


```Javascript
// zh_hans/index.js
module.exports = {
  "lwio": "梁王",
  "happy": "开心",
  "network": "网络",
  "good-adjective": "好的"
}
```

```Javascript
// zh_hans/index.js
module.exports = {
  "lwio": "梁王",
  "happy": "開心",
  "network": "網路",
  "good-adjective": null  // not translated yet
}
```

```Javascript
// en/index.js
module.exports = {
  "lwio": "lwio",
  "happy": "happy",
  "network": "network",
  "good-adjective": "good",
}
```

## 加载顺序
attribute > itemTemplate > creatureTemplate > item > creature

> 其余的比如i18n以及action由于对其他的不影响，就不在这列出来细节了，不影响。
