// const Bundle = require('theworld-core').Bundle;
// const keyboard = Bundle.createItem(Bundle.getItemTemplate('keyboard'));
// const macbook = Bundle.createItem(Bundle.getItemTemplate('macbook'));

module.exports = {
    id: 'lwio', // one of the author's nickname
    name: '${lwio}',
    description: 'one of the founder of theworld and sundog',
    gender: 'male',
    race: 'human',
    inventory: {
        maxItem: 50,
        items: {
            // [macbook.id]: macbook,
        },
    },
    equipment: {
        // 'right-hand': keyboard, // using keyboard to hit :)
    },
    templateId: 'lwio-template',
    state: 'thinking', // 保留，智能状态机 state machine
    position: {
        areaId: 'zhongweitong',
        x: 0,
        y: 0,
        direction: 'south',
    },
    attributes: {
        'magic-power': 400,
    },
    isAlive: true, // false if the creature is dead. :)
    think: (world, player, me) => {
        if (me.isAlive) {
            return {
                actionId: 'think',
            };
        }
    },
    meta: {
        isGod: true,
    },
};
