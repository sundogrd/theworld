module.exports = () => ({
    type: 'soil',
    placeable: true,
    movable: true,
    origin: null,
    meta: {
        fertility: Math.floor(Math.random() * 100),
    },
});
