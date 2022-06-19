const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        clickjack: './scripts/clickjack.js',
        worker: './scripts/worker.js',
        wweb: './scripts/wweb.js',
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    output: {
        path: path.join(__dirname, 'scripts'),
        filename: '[name].min.js',
    },
    watchOptions: {
        ignored: /node_modules/,
    },
};
