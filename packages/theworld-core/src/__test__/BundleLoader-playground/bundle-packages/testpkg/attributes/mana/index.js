module.exports = {
    name: 'mana',
    base: 10,
    formula: {
        requires: ['intellect'],

        metadata: {
            levelMultiplier: 0.33,
        },
        // 每次applyWorldUpdate时触发attribute的更新
        fn: function(creature, currentValue, dependencies) {
            // Using the example formula from before:
            return Math.floor(
                currentValue +
                    dependencies.intellect +
                    // to access the `metadata` inside the formula use `this.metadata`
                    creature.meta.level * this.metadata.levelMultiplier,
            );
        },
    },
    // how about some creature don't have this attribute in their definition
    fallback: creature => {
        if (creature.meta.intellect) {
            return creature.meta.intellect * 10;
        }
        return 100;
    },
};
