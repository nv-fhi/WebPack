/// <binding BeforeBuild='Run - Development' />
// Webpack Production settings
/*const prod = process.argv.indexOf('-p') !== -1;*/

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path'),
    webpack = require('webpack'),
    fs = require('fs'),
    Chunks2JsonPlugin = require('chunks-2-json-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


//const pages = (function () {
//    const entryPoints = [];
//    const basePath = "Scripts/root",
//        contentFolder = path.resolve(basePath),
//        dataFolders = fs.readdirSync(contentFolder),
//        folderPaths = dataFolders.map(folder => `${basePath}/${folder}`);

//    for (let i = 0; i < folderPaths.length; i++) {
//        const data = fs.readdirSync(folderPaths[i]);
//        for (let j = 0; j < data.length; j++) {
//            data[j].endsWith('.js') ? entryPoints.push(`.${folderPaths[i]}/${data[j]}`) : folderPaths.push(`${folderPaths[i]}/${data[j]}`);
//        }
//    }
//    return entryPoints;

//})();

const pages = [
    // need func to scan on start for all possible entry points
    // autotrack all the pages in directory 
    "home/index",
    "home/aboutus",
];

//serialize pages for entry point
module.exports = {

    entry: pages.reduce((config, page) => {
        config[page] = `./Scripts/root/${page}.js`
        // ./Scripts/root/
       /* config[page] = `${page}`;*/
        console.log(config);
        return config;
    }, {}),
    

    output: {
      
        filename: 'root/[name].[chunkhash].js',
        path: path.resolve(__dirname, "assets/js"),
        
    },

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
                // how to get dynamic parts out off node_modules without having a reference to the specific side
                //commons: {
                //    // what are commons? all js from 
                //    name: 'commons',
                //    chunks: 'initial',
                //    minChunks: 2,
                //},
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
        new Chunks2JsonPlugin({
            filename:"bundles.json",
            outputDir: '.',
           
        }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ],
    stats: { colors: true }
}

