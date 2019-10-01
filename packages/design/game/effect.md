# Effect

### 基本描述

Effect指作用于Creature的效果，比如喝药水回复，烧伤，流血，中毒，祝福。

Effect
用于描述一个效果本身，比如流血。但实际作用是通过effecteffort进行作用的。

EffectEffort
用于描述一个效果在人物身上的持续时间，层数。

### 目标

### 如何实现/设计

简单的设计是无论是物品还是技能，在使用或者其他场景下在代码里手动new一个effec对象来实现？
但考虑一下如果要要移除一种effect，岂不是要把所有new 这个effect的代码都进行改动？

考虑有个effectManager对象之类的东西来同一代理effect的新增移除功能。具体的来说就是要产生effect是，调用effectManager的getEffects方法来获取具体的effect，不必知道具体有哪些方法

effect类似于一个模板或者工厂对象

### Effect属性

| 属性 | 描述 | 数据类型 | 默认值 | 
| --- | --- | --- | --- |
| name | 名称 | string | |
| description | 具体描述 | string | '' |
| persistType | 生效类型 | PersistType | |
| duration | 持续时间 | int | 0 |
| time | 生效次数 | int | 1 |
| interval | 作用间隔 | int | 0 |
| conditions | 生效前提条件 | 
| meta | 额外信息 | object | {} 

### Effort

| 属性 | 描述 | 数据类型 | 默认值 | 
| --- | --- | --- | --- |
| startTime | 开始时间 | int | 0
| remaining | 持续时间 | int | 0
| meta | 额外信息 | object | {}

**生效类型**
1. GamePersistType
2. AreaPersistType
3. ScenePersistType
4. BattlePersistType

### API


### 关联对象

