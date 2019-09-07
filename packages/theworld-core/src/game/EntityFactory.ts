'use strict';

import Npc from './Npc'
import BehaviorManager from './BehaviorManager'
import GameEntity from './GameEntity';

/**
 * Stores definitions of entities to allow for easy creation/cloning
 */
class EntityFactory {
    entities: Map<string, Record<string, any>>;
    scripts: BehaviorManager;
    constructor() {
        this.entities = new Map();
        this.scripts = new BehaviorManager();
    }

    /**
   * @param {string} entityRef
   * @return {Object}
   */
    getDefinition(entityRef: string) {
        return this.entities.get(entityRef);
    }

    /**
   * @param {string} entityRef
   * @param {Object} def
   */
    setDefinition(entityRef: string, def): void {
        def.entityReference = entityRef;
        this.entities.set(entityRef, def);
    }

    /**
   * Add an event listener from a script to a specific item
   * @see BehaviorManager::addListener
   * @param {string}   entityRef
   * @param {string}   event
   * @param {Function} listener
   */
    addScriptListener(entityRef: string, event: string, listener: Function): void {
        this.scripts.addListener(entityRef, event, listener);
    }

    /**
   * Create a new instance of a given npc definition. Resulting npc will not be held or equipped
   * and will _not_ have its default contents. If you want it to also populate its default contents
   * you must manually call `npc.hydrate(state)`
   *
   * @param {Area}   area
   * @param {string} entityRef
   * @param {Class}  Type      Type of entity to instantiate
   * @return {type}
   */
    createByType(entityRef, Type: FunctionConstructor) {
        const definition = this.getDefinition(entityRef);
        if (!definition) {
            throw new Error('No Entity definition found for ' + entityRef)
        }
        const entity = new Type(definition);

        if (this.scripts.has(entityRef)) {
            this.scripts.get(entityRef).attach(entity);
        }

        return entity;
    }

    create(ref: string): GameEntity {
        throw new Error("No type specified for Entity.create");
    }

    /**
   * Clone an existing entity.
   * @param {Item|Npc|Room|Area} entity
   * @return {Item|Npc|Room|Area}
   */
    clone(entity: GameEntity): GameEntity {
        return this.create(entity.entityReference);
    }
}

export default EntityFactory
