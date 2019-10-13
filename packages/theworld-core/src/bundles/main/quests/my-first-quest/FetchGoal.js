'use strict';

const { QuestGoal } = require('ranvier');

/**
 * A quest goal requiring the player picks up a certain number of a particular item
 */
module.exports = class FetchGoal extends QuestGoal {
    // Quest goal constructor takes the quest it's attached to, a configuration of
    // this particular goal, and the player the quest is active on
    constructor(quest, config, player) {
        // Here we'll have our custom config extend some default properties: removeItem, target item and count
        config = Object.assign(
            {
                title: 'Retrieve Item',
                removeItem: false,
                count: 1,
                item: null,
            },
            config,
        );

        // Call parent QuestGoal constructor
        super(quest, config, player);

        /*
    All quests have a "state"; this is the part that contains any data that is relevant
    to the current progress of the quest. So in the constructor we will set the initial
    progress of this to indicate that the player hasn't picked up any of the target item yet
    */
        this.state = {
            count: 0,
        };

        // Setup listeners for the events we want to update this quest's progress
        this.on('get', this._getItem);
        this.on('drop', this._dropItem);
        this.on('decay', this._dropItem);
    }

    /*
  Because Quest has no opinions and makes no assumptions, it requires you to tell it how to
  get the current progress of this type of goal based on its state and configuration. In
  our FetchGoal, progress is defined as how many items have they picked up out of how many
  they need to pick up in total.

  getProgress() should return an object like so:
  {
    percent: <number> 0-100 completion percentage,
    display: <string> What the user should see when the progress updates
  }
  */
    getProgress() {
        const percent = (this.state.count / this.config.count) * 100;
        const display = `${this.config.title}: [${this.state.count}/${this.config.count}]`;
        return { percent, display };
    }

    /*
  What should happen when the player completes the quest (or the game tries to complete it
  for the player automatically)
  */
    complete() {
        // Sanity check to make sure it doesn't actually complete before it's supposed to
        if (this.state.count < this.config.count) {
            return;
        }

        const player = this.quest.player;

        // Here, we implement our removeItem config.
        // If removeItem is true, we remove all copies of the item from the player's inventory
        // once the quest is complete.
        if (this.config.removeItem) {
            for (let i = 0; i < this.config.count; i++) {
                for (const [, item] of player.inventory) {
                    if (item.entityReference === this.config.item) {
                        // Use the ItemManager to completely remove the item from the game
                        this.quest.GameState.ItemManager.remove(item);
                    }
                }
            }
        }

        super.complete();
    }

    /*
  What should happen when the player picked up any item
  */
    _getItem(item) {
        // Make sure the item they picked up is the item the quest wants
        if (item.entityReference !== this.config.item) {
            return;
        }

        // update our state to say they progressed towards the goal
        this.state.count = (this.state.count || 0) + 1;

        // don't notify the player of further progress if it's already ready to turn in
        if (this.state.count > this.config.count) {
            return;
        }

        // notify the player of their updated progress
        this.emit('progress', this.getProgress());
    }

    /*
  If the player drops one of the requested items make sure to subtract that from their
  current progress
  */
    _dropItem(item) {
        if (!this.state.count || item.entityReference !== this.config.item) {
            return;
        }

        this.state.count--;

        // Again, don't notify the player of change in progress unless they can no longer
        // turn in the quest
        if (this.state.count >= this.config.count) {
            return;
        }

        this.emit('progress', this.getProgress());
    }
};
