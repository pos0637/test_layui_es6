var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/scripts/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[hash].bundle.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'html')]
            },
            {
                test: /\.js$/,
                loaders: ['es3ify-loader'],
                enforce: 'post'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'html/index.html'),
            inject: true,
            chunks: ['main']
        }),
        new htmlWebpackPlugin({
            filename: 'test_treegrid.html',
            template: path.resolve(__dirname, 'html/test_treegrid.html'),
            inject: true,
            chunks: ['main']
        }),
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, 'html/vendors'),
            to: path.resolve(__dirname, 'dist/vendors'),
            type: 'dir'

        }])
    ],
    devtool: 'cheap-module-eval-source-map'
};