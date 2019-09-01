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
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
};
