type AttributeDoc = {
    key: string;
    // template available
    name: string;
    // To make an attribute computed you add the 'formula' config with the
    // 'requires' and 'fn' properties
    formula: {
        // 'requires' specifies which attributes the formula depends on for its
        // calculation. You may depend on attributes defined in a different bundle.
        requires: Array<string>;

        metadata: any;

        // 'fn' is the formula function. The function will automatically receive
        // as arguments:
        //   1. The character the attribute belongs to
        //   2. The current value, after effects, of this attribute
        //   3+ One argument for each attribute in the `requires` list in the same
        //      order. For example, if your requires was:
        //        ['foo', 'bar', 'baz']
        //      Then your formula function would receive:
        //        function (character, mana, foo, bar, baz)
        //      Each is the value, after effects/formulas, of that attribute
        fnScript: string;
    };
};

export default AttributeDoc;
