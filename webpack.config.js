const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: ['./src/main.ts'],
    target: 'node',
    watch: !isProduction,
    mode: isProduction ? 'production' : 'development',
    externals: [
        nodeExternals(),
    ],
    module: {
        rules: [
            {
                test: /.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "@": path.resolve(__dirname, 'src')
        },
        unsafeCache: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new WebpackShellPlugin({
            onBuildEnd: {
                scripts: [isProduction ? 'node dist/server.js' : 'npm run watch'],
            }
        })],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
    },
};