/// <binding BeforeBuild='Run - Development' />
// Webpack Production settings
/*const prod = process.argv.indexOf('-p') !== -1;*/

const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
/*Chunks2JsonPlugin = require('chunks-2-json-webpack-plugin');*/

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

        filename: 'root/[name].[chunkhash].js',
        /*  filename: (prod) ? "root/[name].[chunkhash].js" : "root/[name].js",*/
        path: path.resolve(__dirname, "assets/js"),
        //publicPath
    },
    //plugins: [
    //    new Chunks2JsonPlugin({ outputDir: 'dist/', publicPath })
    //]
    // IMPORTANT NOTE: If you are using Webpack 2 or above, replace "loaders" with "rules"
    // webpack v5 > v2 
    module: {

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
        //new Chunks2JsonPlugin({
        //    outputDir: 'dist/',
        //    publicPath
        //}),
        new HtmlWebpackPlugin({
            inject: false,
            template: "./Views/Shared/_Bundles.Template.cshtml",
            filename: "./Views/Shared/_Bundles.cshtml",

        })
    ],
    stats: { colors: true }
}
