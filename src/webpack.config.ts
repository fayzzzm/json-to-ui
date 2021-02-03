/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const appPath = path.resolve(__dirname, './src');
const codeMirrorPath = path.resolve(__dirname, './node_modules/codemirror/lib/codemirror.css');
const nodeModulesPath = path.resolve('./node_modules');

module.exports = {
    entry: {
        app: './src/src/index.tsx',
    },
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
        alias: {
            '@app': appPath,
            '@utils': path.resolve(appPath, './utils'),
            '@components': path.resolve(appPath, './components'),
            '@client-types': path.resolve(appPath, './types'),
        },
        modules: [appPath, nodeModulesPath],
    },
    devServer: {
        port: 9000,
        open: true,
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.tsx?/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.json',
                        },
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: appPath,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            minify: false,
        }),
        new MiniCssExtractPlugin({
            filename: '[hash].css',
        }),
    ],
};
