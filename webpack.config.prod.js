const merge = require('webpack-merge');
const exp = require('./webpack.config.base');

const prodMain = merge(
    {
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                {
                    test: /\.tsx?$/,
                    loaders: ['ts-loader'],
                },
            ],
        },
    },
    exp[0],
);

const prodRenderer = merge(
    {
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                {
                    test: /\.tsx?$/,
                    loaders: ['ts-loader'],
                },
                // This will cause the compiled CSS (and sourceMap) to be
                // embedded within the compiled javascript bundle and added
                // as a blob:// uri at runtime.
                {
                    test: /\.(less|css)$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: {
                                    autoprefixer: {
                                        add: true,
                                        browsers: [
                                            'FireFox > 1',
                                            'Chrome > 1',
                                            'ie >= 8',
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            loader: 'less-loader',
                        },
                    ],
                },
            ],
        },
    },
    exp[1],
);

module.exports = [prodMain, prodRenderer];
