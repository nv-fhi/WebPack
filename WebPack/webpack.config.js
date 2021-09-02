/// <binding BeforeBuild='Run - Development' />

const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = [

    //autotrack all the pages in directory 
    "home/index",
    "home/aboutus",
];

//serialize pages for entry point
module.exports = {

    entry: pages.reduce((config, page) => {
        config[page] = `./Scripts/root/${page}.js`

        return config;
    }, {}),

    output: {
        filename: 'root/[name].js',
        path: path.resolve(__dirname, "assets/js"),
    },
    // IMPORTANT NOTE: If you are using Webpack 2 or above, replace "loaders" with "rules"
    module: {
        // webpack v5 > v2 
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: "./Views/Shared/_Bundles.Template.cshtml",
            filename: "./Views/Shared/_Bundles.cshtml",

        })
    ],
    stats: { colors: true }
}









//const path = require("path");

//var HtmlWebpackPlugin = require("html-webpack-plugin");

////autotrack all the pages in directory 
//const pages = [
//    "home/index",
//    "home/aboutus",
//];
//module.exports = {
//    mode: "development",
//    /*  entry: "./src/index.js",*/

//    entry: pages.reduce((config, page) => {
//        config[page] = `./Scripts/root/${page}.js`
//        return config;
//    }, {}),
//    output: {
//        // check again
//        filename: `root/[name].[contentHash].js`,
//        path: path.resolve(__dirname, "assets/js")
//    },
//    plugins: [
//        new HtmlWebpackPlugin({
//            template: "./Views/Shared/_Bundles.cshtml"
//        })
//    ],
//    // css- javascript- loaders etc..
//    module: {
//        rules: [
//            {
//                loader: 'babel-loader',
//                test: /\.js$/,
//                exclude: /node_modules/
//            }
//        ]

//    }
//}


























