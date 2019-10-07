'use strict';

const { QuestReward } = require('ranvier');

/**
 * Quest reward that gives experience
 *
 * Config options:
 *   amount: number, default: 0, static amount of experience to give
 */
module.exports = class ExperienceReward extends QuestReward {
    /*
  IMPORTANT: Reward classes are used statically
  */

    /**
     * The reward method is called when the player has completed the quest and
     * we want to actually assign the reward.
     *
     * The method accepts the GameState object allowing you to access the other
     * factories/managers for doing things like creating effects/accessing
     * areas/etc., the quest instance, the configuration of the reward
     * as defined by the builder, and the player to receive the reward.
     */
    static reward(GameState, quest, config, player) {
        // This is a very simple reward in that it emits an event that will
        // be handled elsewhere for actually incrementing the player's experience,
        // leveling them up, etc.
        player.emit('experience', config.amount);

        // However, you are free to do as you wish in here
    }

    /**
     * the display() method is given the same parameters as reward() and is not
     * directly used by the core but you may use it in your commands to display
     * the rewards to the player. For example the `bundle-example-quests` bundle
     * calls this when the player looks at their quest log.
     *
     * The method returns a string, that's it.
     */
    static display(GameState, quest, config, player) {
        return `Experience: <b>${config.amount}</b>`;
    }
};
