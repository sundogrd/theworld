## Creature

### 分类

分为smart和dumb creature

smart 可以执行特定的AI或者脚本

一些说明：大部分属性都只有其他对象的部分属性

### 属性

```yaml
name: string
id: string
gendor: string
items: 
    - 
        id: string
        description: string
        type: string # 物品类型
        meta: object # 比如售价 比如效果
        # ...
effects: # 状态 [Effect]
    - 
        id: string
        type: string
        description: string
        meta: object
        # ...
equipment: # [Equipment]
    -
        id: string
        description: string
        type: string # 武器类型
        meta: object
        # ...
attributes:
    height: Attribute
    weight: Attribute
    age: Attribute
    hp: Attribute
    mp: Attribute
    # 其他
position: Postion
skills: 
    -
        cook: Skill
meta: object # 自定义属性
direct: function # director执行时的脚本， smart类型必须
active: function # 激活时执行脚本
reactive: function # 交互时脚本 可能有不同的类型 比如talk, steal attack research等
```

```js
// 大概的想法
direct(world, director, player, time)
active(world, player, time)
reactive(world, player, target, time) => 生成其他对应的交互对象，比如如果是交谈类的交互行为，生成一个talkReactive实例来进行处理
```

## Item

分为如下类别：

1. 可食用
2. 可使用
    1. 特殊物品
    2. 普通物品
3. 可放置
4. 可骑乘
    1. 海
    2. 陆
    3. 空
    4. 其他
5. 可装备
    1. 防具
    2. 武器
6. 其他类型（提供接口）

### 接口

```js
ride(world, creature, target, position, time)

use(world, creature, target, position, time)

place(world, creature, target, position, time)

equip(world, creature, target, position, time)

eat(world, creature, target, position, time)

```
留一个可扩展动作的接口

**一些基本类：**
可消耗不可再生
可消耗可再生
不可消耗
可阻挡
不可阻挡
可破坏
不可破坏

具体的类型ItemType继承对应的类即可(可多继承), 比如Equipment实现可消耗不可再生，可破坏这种

### 属性

```yaml
name: string
id: string
type: ItemType

effects: # 状态 每种物品有不同的schema，这个可以开发者自定义对应物品的schema
    - 
        # 虽然可以给出几个 但还是自己定义吧，比如speed hp mp等
meta: object # 自定义属性
```

## Effect

一些buff或者一些debuff...

只针对creature

### 属性

```yaml
id: string
name: string
type: EffectType
description: string
persistType: PersistType # 生效类型
startTime: number
duration: number
time: number # 生效次数 -1表示每隔多少时间就会生效
interval: number # 自动生效间隔，配合time
conditions: [some attribute] # 只有部分情况才会生效
meta: object # 自定义属性 比如是否立即生效,几率这种 可参考ranvier的effect属性


EffectEffort
remaining: 持续时间
layer: 层数
effect: effect
```

具体的EffectType 没怎么想好
1. Buff
    1. Creature
    2. Item
    3. Skill
    4. Game
    5. Others
2. Debuff
    1. Creature
    2. Item
    3. Skill
    4. Game
    5. Others


具体的PersistType
1. GamePersistType
2. AreaPersistType
3. ScenePersistType
4. BattlePersistType


### 接口

```
active(world, target, postion, time)
deactive(world, target, postion, time)
get/set
```

## Skill

### 属性

```yaml
id: string
name: string
type: SkillType
description: string
startTime: number
duration: number
delay: number # 延迟
time: number # 生效次数 -1表示每隔多少时间就会生效
interval: number # 自动生效间隔，配合time
target: Objects # 目标对象
conditions: [some attribute] # 只有部分情况才能执行
coolDown: number # 冷却时间
meta: object # 自定义属性
```

SkillType 提供注入

### 接口

```js

excute(world, target, time)
pause(world, target, time)
resume(world, target, time)

```

## Attribute

属性点，具体有哪些属性需要开发者自己定义，只提供操作属性的方法

### 属性

```yaml
id: string
name: string
type: AttributeType
description: string
value: number|string
meta: object # 自定义属性
```

### 接口
```js
add
decrease
get
set
```

## Party

团体， 用于实现组织相关的需求

我在想是只包含生物呢还是可以不包含生物呢？比如一条河可以看成是水的party, 如果我以后实现移除方法的话就可以直接调用party对应的remove方法了，而不是一个一个调用水的remove方法
### 属性

```yaml
id: string
name: string
# type: PartyType # 比如有
description: string
leader: number|string # 创建者
integrator: [objet] # 包含的集合
meta: object # 自定义属性
```

### api
```js
add // 加入
quit // 退出
invite // 邀请
remove // 移除
dismiss // 解散
```