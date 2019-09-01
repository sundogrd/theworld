import * as events from "events";

const Logger = require('./Logger');
const Scriptable = (parentClass: typeof events.EventEmitter) =>
class extends parentClass {
    __pruned: any;
    behaviors: Set<string>;
  emit(name: string, ...args: any[]) {
    // Squelch events on a pruned entity. Attempts to prevent the case where an entity has been effectively removed
    // from the game but somehow still triggered a listener. Set by respective entity Manager class
    if (this.__pruned) {
      this.removeAllListeners();
      return;
    }

    super.emit(name, ...args);
  }
    removeAllListeners() {
        throw new Error("Method not implemented.");
    }

  /**
   * @param {string} name
   * @return {boolean}
   */
  hasBehavior(name: string): boolean {
    return this.behaviors.has(name);
  }

  /**
   * @param {string} name
   * @return {*}
   */
  getBehavior(name) {
    return this.behaviors.get(name);
  }

  /**
   * Attach this entity's behaviors from the manager
   * @param {BehaviorManager} manager
   */
  setupBehaviors(manager) {
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
