var utils = require('./utils')
var conf = require('./app.conf')
module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: !conf.conf.dev,
        extract: conf.conf.dev
    })
}
