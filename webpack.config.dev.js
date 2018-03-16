var path = require('path');
var copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/scripts/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'html')]
            }
        ]
    },
    plugins: [
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, 'html/admin'),
            to: path.resolve(__dirname, 'dist/admin'),
            type: 'dir'

        }]),
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, 'html/vendors'),
            to: path.resolve(__dirname, 'dist/vendors'),
            type: 'dir'

        }])
    ],
    devtool: 'cheap-module-eval-source-map'
};