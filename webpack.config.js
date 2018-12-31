/* eslint-disable */ 
const path = require('path');
const config = {
    entry: "./src",
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
            }
        ]
    },
    target: "electron-renderer"
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.output = {
            filename: 'renderer.js',
            path: path.resolve(__dirname, 'public')
        }
    } else if (argv.mode === 'production') {
        config.output = {
            filename: 'renderer.js',
            path: path.resolve(__dirname, 'app/public')
        }
    }
    return config;
};