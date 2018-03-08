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
                exclude: path.resolve(__dirname, 'node_modules'),
                query: {
                    presets: ['latest']
                }
            },
            {
                test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                loader: 'imports-loader?jQuery=jquery'
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /\.(ttf|eot)$/,
                loader: 'file-loader'
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
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, 'html/vendors'),
            to: path.resolve(__dirname, 'dist/vendors'),
            type: 'dir'
        }])
    ],
    devtool: 'cheap-module-eval-source-map'
}