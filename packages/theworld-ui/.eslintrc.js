module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        camelcase: 'off',
        "@typescript-eslint/interface-name-prefix": ["error", { "prefixWithI": "always" }],
        '@typescript-eslint/indent': ["error", 4],
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
};
