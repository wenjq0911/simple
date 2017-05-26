var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var conf = require('./app.conf') 
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    entry: {
        app: './wwwroot/main.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './wwwroot/dist/')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('wwwroot')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                    options: {
                        publicPath: 'dist/resources/img/'
                    }
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    publicPath: 'dist/'
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
    }
};



