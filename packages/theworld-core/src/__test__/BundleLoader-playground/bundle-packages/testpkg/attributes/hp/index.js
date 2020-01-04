module.exports = {
    name: 'hp',
    base: 100,
    formula: {
        requires: [],
        metadata: {
            levelMultiplier: 10,
        },
        // 每次applyWorldUpdate时触发attribute的更新
        fn: function(creature, currentValue, dependencies) {
            // Using the example formula from before:
            return Math.floor(
                currentValue + creature.meta.level * this.metadata.levelMultiplier,
            );
        },
    },
    // how about some creature don't have this attribute in their requires
    fallback: creature => {
        return 100;
    },
};
