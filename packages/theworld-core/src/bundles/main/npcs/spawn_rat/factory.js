'use strict';
const path = require('path');

const template = {
    keywords: ['rat'],
    // name for instance
    baseName: 'rat'
    availableTitle: ["big", "giant", "tiny"],
    description: "The rat's beady red eyes dart frantically, its mouth foaming as it scampers about."
    levelRange: {
        min: 2,
        max: 50
    },
    script: '1-rat',
    // determine what items does this creature have, percent
    availableItemsExpression: {
        "woodenchest": "5 + ${level / 2}"
    },
    attributes: {
        healthRange: {
            min: 100,
            max: 200,
        },
        speedRange: {
            min: 2.5,
            max: 3
        }
    },
    damage: {
        minRange: {
            min: 1,
            max: 2
        },
        maxRange: {
            min: 5,
            max: 7,
        }
    },
    behaviors: {
        lootable: {
            table: {
                pools: ["???"]
            }
        }
    }
}

module.exports = function (area, player) {
    return {
        id: "rat_214891274",
        keywords: ['rat'],
        name: "tiny rat",
        level: 6,
        description: "The rat's beady red eyes dart frantically, its mouth foaming as it scampers about.",
        script: '1-rat',
        items: [],
        attributes: {
            health: 100,
            speed: 2.5,
        },
        damage: {
            min: 2,
            max: 6,
        }
    }
};
