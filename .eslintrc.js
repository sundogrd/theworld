module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        camelcase: 'off',
        '@typescript-eslint/indent': ["error", 4],
        "class-methods-use-this": ["error", { "exceptMethods": [] }],
        "@typescript-eslint/explicit-function-return-type": ["error", {
            "allowExpressions": true,
        }],
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
                "@typescript-eslint/explicit-function-return-type": 'off',
            },
        },
    ],
};
