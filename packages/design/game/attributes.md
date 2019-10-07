# attributes
和meta的不同computed的一个值，比如中毒时一些【属性】。
Representation of an "Attribute" which is any value that has a base amount and depleted/restored safely. Where safely means without being destructive to the base value.

Attributes comprise the changing numerical properties of an Npc or Player (both referred to simply as "character" from here on). Things like health, strength, and mana. An Attribute should be used (instead of say, metadata) if you have a numerical property that can change over time (by damage or some other process) or be modified by an Effect from something like a potion or piece of equipment.

## 定义
```Typescript
const manaAttribute = {
  name: 'mana',
  base: 10,
  formula: {
    requires: ['intellect'],

    metadata: {
      levelMultiplier: 0.33,
    },
    // 每次applyWorldUpdate时触发attribute的更新
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

### 循环依赖

Circular References
A circular dependency check is done at startup to prevent attributes depending on each other. You will see the following error when trying to run the server:

error: Attribute formula for [attribute-a] has circular dependency [attribute-a -> attribute-b -> attribute-a]

## 例子
Recipes¶
Class/race modifiers¶
Example computed attribute which uses metadata to change the formula depending on the character's class.

  {
    name: 'attack_power',
    base: 10,
    // We'll use the example that warriors get 2 points of attack power per
    // point of strength, whereas rogues and mages get less
    metadata: {
      // classModifiers is not special, it's just something I've made up.
      // Don't worry if your game doesn't plan on having classes. This could be
      // any data you like.
      classModifiers: {
        warrior: 2,
        rogue: 1,
        mage: 0.5,
        _default: 1,
      },
    },
    formula: {
      requires: ['strength'],
      fn: function (character, attack_power, strength) {
        const characterClass = character.getMeta('class') || '_default';
        const modifier = this.metadata.classModifiers[characterClass];
        return attack_power + (strength * modifier);
      },
    },
  },
];
Because the modifiers are stored in the attribute metadata you can access this value outside of the formula as well. For example, if you wanted to create a command which shows the AP bonus for a character:

const ap = character.getAttribute('attack_power');
const characterClass = character.getMeta('class') || '_default';
const modifier = ap.metadata.classModifiers[characterClass];
Broadcast.sayAt(character, `You get ${modifier} AP per point of strength`);
So with that attribute a warrior with 20 strength, and a ring of +15 attack_power will have

   10 (base)
+  15 (ring effect)
+  20 (strength) * 2 (modifier)
-----
   65 attack_power
% bonuses¶
It's a common RPG pattern to have an attribute like health both static +20 max health and +5% max health bonuses. To accomplish this we will use two attributes: health and health_percent.

health will act as the base health attribute and handle static +20 max health style bonuses. This attribute will also be used for the player taking damage/being healed.
health_percent will exist only to handle +5% max health style bonuses and will generally only be modified by effects
We'll use the formula:

(health + static bonus) * percentage bonus
[
  {
    name: 'health',
    base: 100,
    formula: {
      requires: ['health_percent'],
      fn: function (character, health, health_percent) {
        // `health` will be our health pool after modified by our static bonuses
        // like +20 max health

        // health_percent will be a whole number like 25 so we've gotta turn
        // 25 into 1.25
        const modifier = (1 + (health_percent / 100));

        return Math.round(health * modifier);
      },
    }
  },

  { name: 'health_percent', base: 0 },
]
Let's take the following scenario:

Base health of 100
Wearing a ring with +20 max health
Has an effect that gives +30% max health
So the formula will look like:
(100 + 20) * (1 + (30 / 100))
            =
        120 * 1.30
            =
           156
If, however, you want to have the formula:

(health * percentage bonus) + static bonus`
We'll need to change our formula slightly:

// ...
fn: function (character, health, health_percentage) {
  // get the static bonus amount from the difference of base and current max health
  const staticBonus = health  - this.base;

  // again, health_percent will be a whole number like 25 so we've gotta turn
  // 25 into 1.25
  const modifier = (1 + (health_percent / 100));

  return Math.round(health * modifier + staticBonus);
},
// ...
Now, given the same scenario:

Base health of 100
Wearing a ring with +20 max health
Has an effect that gives +30% max health
So the formula will look like:
(100 * (1 + (30 / 100))) + 20
            =
        130 + 20
            =
           150
Giving Characters Attributes¶
As mentioned above, defining attributes does not assign them to any character. By default characters have no attributes. You must add them either in their definition in the case of NPCs, or at runtime in the case of player creation.

NPCs¶
For NPCs setting attributes is just a matter of using the attributes property in their definition. For example:

- id: rat
  name: A Rat
  level: 2
  attributes:
    # each key is the attribute you want to add, and the value will be the
    # base for that attribute
    health: 100
