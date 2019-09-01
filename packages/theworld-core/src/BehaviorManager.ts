import EventManager from "@/EventManager";

/**
 * BehaviorManager keeps a map of BehaviorName:EventManager which is used
 * during Item and NPC hydrate() methods to attach events
 */
class BehaviorManager {
    behaviors: Map<string, EventManager>;
    constructor() {
        this.behaviors = new Map();
    }

    get(name: string) {
        return this.behaviors.get(name);
    }

    has(name: string) {
        return this.behaviors.has(name);
    }

    addListener(behaviorName: string, event: string, listener: Function) {
        if (!this.behaviors.has(behaviorName)) {
        this.behaviors.set(behaviorName, new EventManager());
        }

        this.behaviors.get(behaviorName).add(event, listener);
    }
}

export default BehaviorManager
