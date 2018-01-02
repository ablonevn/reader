// import VueMaterial from "vue-material";

var path = require('path');
// var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
// const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
// const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
// const OptimizeJsPlugin = require('optimize-js-plugin');
// var DashboardPlugin = require('webpack-dashboard/plugin');
const ConcatPlugin = require('webpack-concat-plugin');


const {CheckerPlugin} = require('awesome-typescript-loader');

var isProd = process.env.NODE_ENV == "prod";
var prodPlugins = [];
if (isProd) prodPlugins = [
    new UglifyJsPlugin({
        // beautify: true, //debug
        mangle: true, //debug
        // dead_code: false, //debug
        // unused: false, //debug
        // deadCode: false, //debug
        // compress: {
        //   screw_ie8: true,
        //   keep_fnames: true,
        //   drop_debugger: false,
        //   dead_code: false,
        //   unused: false
        // }, // debug
        // comments: true, //debug


        beautify: false, //prod

        output: {
            comments: false
        }, //prod
        //mangle: {
        //   screw_ie8: true
        //}, //prod
        compress: {
            screw_ie8: true,
            warnings: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
            negate_iife: false // we need this for lazy v8
        },
    })
];


function jl(file) {
    return path.join(__dirname, file);
}

module.exports = {
    entry: {
        main: "./src/main.tsx",
        polyfills: "./src/polyfills.js",

    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: '[name].bundle.js',
    },
    resolve: {
        alias: {
            'jquery': jl("node_modules/jquery/dist/jquery.min.js"),
        },
        modules: [path.resolve(__dirname), path.resolve(__dirname, './src'), path.resolve(__dirname, './node_modules')],
        extensions: ['.ts', '.jsx', '.tsx', '.js', '.json', '.css', '.scss', '.ttf', '.woff', '.woff2', '.eot'],

    },
    externals: {
        $:true,
        jQuery:true,
    },

    plugins: prodPlugins.concat([
        new ConcatPlugin({
            uglify:true,
            filesToConcat:["jquery"],
            fileName:"externals.bundle.js"
        }),
        new CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
        }),
        new CommonsChunkPlugin({
            name: 'vendor',
            chunks: ["main"],
            minChunks: module => (/node_modules/gi).test(module.resource) || (/vendor/gi).test(module.resource)// || (/^Assests/gi).test(module.resource)
        }),
        new CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),


        new ExtractTextPlugin('styles.css'),
        new CheckerPlugin()
    ]),
    module: {
        loaders: [
            {
                test: /\.(ts|jsx|tsx)$/i,
                loader: 'awesome-typescript-loader'
            }, {
                test: /\.(scss|css)$/i,
                use:ExtractTextPlugin.extract(['css-loader', 'sass-loader'])


            }, {
                test: /\.html$/i,
                loader: 'raw-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                    publicPath: '/'
                }
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        port: 3000
    },
    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }

};