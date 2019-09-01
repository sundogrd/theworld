import * as events from "events";
import BehaviorManager from "@/BehaviorManager";

const Logger = require('./Logger');
const Scriptable = (parentClass: typeof events.EventEmitter) =>
class extends parentClass {
    __pruned: any;
    behaviors: Map<string, any>;
    emit(name: string, ...args: any[]) {
        // Squelch events on a pruned entity. Attempts to prevent the case where an entity has been effectively removed
        // from the game but somehow still triggered a listener. Set by respective entity Manager class
        if (this.__pruned) {
            this.removeAllListeners();
            return;
        }

        return super.emit(name, ...args);
    }
    removeAllListeners() {
        throw new Error("Method not implemented.");
        return this
    }

  hasBehavior(name: string): boolean {
    return this.behaviors.has(name);
  }

  getBehavior(name: string): any {
    return this.behaviors.get(name);
  }

  setupBehaviors(manager: BehaviorManager) {
    for (let [behaviorName, config] of this.behaviors) {
      let behavior = manager.get(behaviorName);
      if (!behavior) {
        Logger.warn(`No script found for [${this.constructor.name}] behavior '${behaviorName}'`);
        continue;
      }

      // behavior may be a boolean in which case it will be `behaviorName: true`
      config = config === true ? {} : config;
      behavior.attach(this, config);
    }
  }
};

export default Scriptable
