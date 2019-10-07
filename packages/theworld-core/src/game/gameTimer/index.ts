import GameWorld, { GameWorldUpdate, EResultType } from "../GameWorld";
import Creature from "../types/Creature";
import Area from '../types/Area';
// the world 时间机制实现

/**
 * 类似于elona的时间机制，时间流动和玩家动作有关系
 * 打算玩家
 *
 * @class GameTimer
 */
class GameTimer {
    constructor(public world: GameWorld) {
        this.world = world;
    }

    // 问题： 有两种考虑
    // 1: 人物每动一次，就会产生一点待消耗时间片，要等其他消耗完这个时间片才可以继续进行下一步？
    // 2: 人物每动一次都累加时间片，其他对象不停消耗这个时间片？
    async tick(): Promise<void> {
        const area = await this.world.getCurArea();
        const player = await this.world.getPlayer();
        const {nextTurn} = player;

        const {creatures} = area;

        const results = await Promise.all(Object.keys(creatures).map(async key => {
            return await this.world.store.getCreature(key)
        }))

        // 当前区域部分
        results.forEach((res: Creature) => {
            if (res.id !== player.id) {
                this.world.applyWorldUpdate(this.consumeLoop(res, nextTurn, player, area, this.world))
            }
        })
        // idle部分 -- 不在当前区域部分
        // this.world.get
    }


    // 将一个loop里面产生的update合并成一个updates,优化性能
    // TODO
    mergeUpdates(updates: GameWorldUpdate[]): GameWorldUpdate {
        return {
            type: EResultType.Message,
            payload: null
        }
    }

    // 这里可把所有回合的update都汇总，简化操作
    // 这里有个问题：
    // 如果其他creature已经死亡，在这个loop之内的剩余时间还需要调用对应方法吗？
    // 如果其他creature已经离开本area, 那么在loop剩余时间之内还需调用idle方法吗？
    consumeLoop(creature: Creature, time: number, player: Creature, area: Area, world: GameWorld): GameWorldUpdate {
        const updates: GameWorldUpdate[] = [];
        const {nextTurn} = creature;
        // 应该有个剩余时间机制 TODO
        // 比如player行动是10    怪物闪电小子行动是3，那么player应该可能受到3次攻击，并且闪电小子还有1个时间结余。
        // 其他creature的回合
        while ((time = time - nextTurn) > 0) {
            // 如果已经死亡
            if (!creature.isAlive) {
                updates.concat(this.triggerCreatureDead(creature, area, world));
                break;
            }
            // 如果已经离开地图
            if (creature.position.areaId !== area.id) {
                updates.concat(this.triggerCreatureLeave(creature, area, world));
                break;
            }
            // 正常的执行area更新
            updates.concat(this.triggerTimeUpdate(area, this.world));

            // 其他creature do action
            const action = creature.think(world, player, creature);
            // do action next
        }
        return this.mergeUpdates(updates);
    }

    
    private triggerTimeUpdate(area: Area, world: GameWorld): GameWorldUpdate[] {
        const {areaManagers} = area;
        const updates: GameWorldUpdate[] = [];
        areaManagers.forEach(manager => {
            updates.push(manager['onTimeUpdate'].call(area, world, area));
        })
        return updates;
    }

    private triggerCreatureLeave(creature: Creature, area: Area, world: GameWorld): GameWorldUpdate[] {
        const {areaManagers} = area;
        const updates: GameWorldUpdate[] = [];
        areaManagers.forEach(manager => {
            updates.push(manager['onCreatureLeave'].call(area, world, creature, area));
        })
        return updates;
    }

    private triggerCreatureDead(creature: Creature, area: Area, world: GameWorld): GameWorldUpdate[] {
        const {areaManagers} = area;
        const updates: GameWorldUpdate[] = [];
        areaManagers.forEach(manager => {
            updates.push(manager['onCreatureDead'].call(area, world, creature, area));
        })
        return updates;
    }
}


export default GameTimer;