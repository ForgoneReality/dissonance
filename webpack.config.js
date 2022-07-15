const path = require('path');

module.exports = {
    entry: './frontend/bench_bnb.jsx',
    output: {
        path: path.resolve(__dirname,'app','assets','javascripts'), 
        filename: './bundle.js',
    },
    module: {
    rules: [
            {
            test: [/\.jsx?$/], // [/\.jsx?$/], // change to this in when we add react
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/env', '@babel/react'] // ['@babel/env', '@babel/react'] // change to this when we add react
            }
            },
            {
                test: /\.(png|jpg|svg|jpeg|gif)$/i,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                    limit: 8192
                    }
                }]
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
    extensions: ['.js', '.jsx', '*'] // ['.js', '.jsx', '*'] // change to this when we add react
    }
};