const soilGen = require('../tiles/templates/soil-generator');
const water = require('../tiles/water')
const rock = require('../tiles/rock')
const sand = require('../tiles/sand')

const defaultAreaManager = {
    id: 'default',
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

// 珍珠港，另一个初始地图
module.exports = {
    id: 'pearl-harbor',
    name: '${pearl-harbor}',
    map: [
        [water, water, soilGen(), soilGen()],
        [water, water, soilGen(), sand],
        [water, soilGen(), soilGen(), sand],
        [water, sand, sand, water],
        [water, sand, rock, sand],
    ],
    creatures: {},
    items: {},
    // where developer register logic into this place.
    areaManagers: [defaultAreaManager],
    meta: {},
};
