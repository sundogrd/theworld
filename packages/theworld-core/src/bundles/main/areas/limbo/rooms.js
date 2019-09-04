'use strict';

const init = (area, player, world) => {

    return {
        id: "white",
        title: "White Room"
        description: "A featureless white room. A pitch black void in the shape of archway can be seen on the east side of the room."
        script: ["white"],
        coordinates: [0, 0, 0]
        exits: {
            "limbo:white": {
                direction: "west",
                leaveMessage: "steps into the light and disappears.",
            }
        },
        doors: {
            "limbo:black": {
                lockedBy: "test_key",
                locked: true,
                closed: true,
            }
        }
    }
};

module.exports = {
    init
}
