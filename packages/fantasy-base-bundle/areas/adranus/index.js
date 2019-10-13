const defaultAreaManager = {
    id: string,
    // trigger only when player is in this area
    onTimeUpdate: (world, area) => {
        return null;
    },
    // trigger only when player is in this area
    onCreatureLeave: (world, creature, to) => {
        return null;
    },
    // trigger only when player is in this area
    onCreatureDead: (world, creature) => {
        return null;
    },
    // trigger when player is **not** in thie area, for Evolution of the area
    onIdle: (world, creature) => {
        return null;
    },
    // run when bundle's area loaded
    init: world => {
        return null;
    },
};

// 阿德瑞斯，启始之地。象征火神的地方。
module.exports = {
    id: 'adranus',
    name: '${adranus}', // or you can just type 'Death Land', but it will not get benefit from i18n mechanism.
    map: [[], []],
    creatures: {},
    items: {},
    // where developer register logic into this place.
    areaManagers: [defaultAreaManager],
    meta: {},
};
