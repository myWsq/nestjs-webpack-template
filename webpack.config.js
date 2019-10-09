const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isDebug = process.env.NODE_ENV === 'debug';
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: ['webpack/hot/poll?1', './src/main.ts'],
    target: 'node',
    watch: isDevelopment || isDebug,
    mode: isProduction ? 'production' : 'development',
    devtool: 'source-map',
    externals: [
        nodeExternals({
            whitelist: ['webpack/hot/poll?1']
        }),
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        // disable type checker - we will use it in fork plugin
                        transpileOnly: true,
                        experimentalWatchApi: true,
                    }
                },
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "@": path.resolve(__dirname, 'src')
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new WebpackShellPlugin({
            onBuildEnd: {
                scripts: [ isDebug ? 'node --inspect-brk dist/server.js':'node dist/server.js'],
            }
        })],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
    },
};