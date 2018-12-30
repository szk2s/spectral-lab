module.exports = {
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