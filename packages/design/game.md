# 游戏设计
类似十字军之王2、太阁立志传、太吾绘卷。明确会是**单人游戏**，可以加入通信玩法，但本质仍然决定是单人游戏，这样不用考虑很多信息的同步问题，而且可以更好更方便的进行扩展

## 游戏玩法设计
游戏的核心玩法是用户扮演一个人在世界中进行冒险（类似太阁立志传），世界中存在许多NPC，NPC有自己的行为以及智能，会与其他NPC交互以及与主角进行各种交互。游戏不限定最终目标但是设计了一些目标给用户。
1. 家族发展，游戏会提供家族体系，类似十字军之王2中的概念，家族NPC之间会有一些特殊交互，（考虑怎么通过核心机制实现？）
2. 转生（或者积累），本游戏需要提供一种方式来让长时间游玩的用户能够积累一些优势的机制，比如传承金钱地位（十字军之王）、属性或技能（太吾绘卷）
3. 收集，成就，以及奖励。
4. 看海，NPC的智能能够满足用户看海的需求，

## 游戏概念设计
抽象整个游戏世界，分为blabla

### 区域(area)、场景(scene)
大地图是一个根区域，类似文件夹结构，区域是场景和区域的集合（类比文件夹和文件）。场景则是一个具有可交互性的位置。

### 对象
对象我认为应该是一个最为抽象的基类，对象包括 智能对象（玩家以及NPC以及命名怪物，），场景可交互物品。
一个对象应该提供一些固有属性（名字等）

### 智能对象
属性（HP、MP、STR等），HP、MP和STR是否是同一概念？
特质，对象的一个key？
状态，如何结合时序又能保证性能？

### 场景可交互物品
属性（耐久度）




# 时序系统

# 对象系统

## 木偶对象系统

## 智能对象系统

## 状态（与时序系统的交集）

# 地图系统


# 智能对象关系系统

# 智能对象AI系统






