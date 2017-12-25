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

var isProd = process.env.NODE_ENV == "prod";
var prodPlugins = [];
if (isProd) prodPlugins = [
    /**
     * Plugin: UglifyJsPlugin
     * Description: Minimize all JavaScript output of chunks.
     * Loaders are switched into minimizing mode.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     *
     * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
     */
    new UglifyJsPlugin({
        // beautify: true, //debug
        mangle: false, //debug
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

var webpackShimConfig = {
    // Remember: Only use shim config for incompatible libraries
    // the libraries below are just examples, regardless whether they are compatible or not
    shim: {
        'jquery': {
            exports: 'jQuery' // Once loaded, use the global 'jQuery' as the module value.
        },
        'vue': {
            exports: 'Vue' // Once loaded, use the global 'jQuery' as the module value.
        },
        'vue-material': {
            exports: 'VueMaterial'
        }
    },
    'masonry': {
        amd: false, // disable AMD module style
        commonjs: true // and use CommonJS module style instead
    }
};

function jl(file) {
    return path.join(__dirname, file);
}

module.exports = {
    entry: {
        main: "./src/main.jsx",
        polyfills: "./src/polyfills.js",
        // 'kd-app': './app/kd-app.js',
        // 'kd-mcdv-app':'./app/kd-mcdv-app.js',
        // 'kduser-app': './app/kduser-app.js',
        // 'kd-contract-app': './app/kd-contract-app.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: '[name].bundle.js',
    },
    resolve: {
        alias: {
            'jquery': jl("node_modules/jquery/dist/jquery.min.js"),
            'angular': jl("node_modules/angular/angular.js"),
            'angular-animate': jl("node_modules/angular-animate/angular-animate.js"),
            "vue": jl("node_modules/vue/dist/vue.min.js"),
            'vue-material': jl('node_modules/vue-material/dist/vue-material.js'),


        },
        modules: [path.resolve(__dirname), path.resolve(__dirname, './src'), path.resolve(__dirname, './node_modules')],
        extensions: ['.ts', '.jsx', '.tsx', '.js', '.json', '.css', '.scss', '.ttf', '.woff', '.woff2', '.eot'],

    },

    plugins: prodPlugins.concat([
        // new DashboardPlugin(),
        new CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
        }),
        // This enables tree shaking of the vendor modules
        new CommonsChunkPlugin({
            name: 'vendor',
            // chunks: ['kduser-app', 'kd-contract-app','kd-mcdv-app',"kd-app"],
            chunks: ["main"],
            minChunks: module => (/node_modules/gi).test(module.resource) || (/vendor/gi).test(module.resource)// || (/^Assests/gi).test(module.resource)

            // function (module) {
            //   // console.log("--------------------------------------",module.userRequest);
            //     var userRequest = module.userRequest;
            //     if (typeof userRequest !== 'string') {
            //         return false;
            //     }
            //     var a=userRequest.indexOf('vendor') >= 0;
            //     if (a) return true;
            //     return !(/\\app/gi.test(module.userRequest));


            //     // return userRequest.indexOf('bower_components') >= 0 ||
            //     //     userRequest.indexOf('node_modules') >= 0 ||
            //     //     userRequest.indexOf('/vendor/') >= 0 ||
            //     //     userRequest.indexOf('libraries') >= 0;
            //     // c++;
            //     // if (c==1) console.log(module);
            //     // return module.userRequest && /node_modules/.test(module.userRequest);
            // }
        }),
        // Specify the correct order the scripts will be injected in
        new CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),
        // ,
        // new CommonsChunkPlugin({
        //   name: 'kd-app',
        //   chunks: ['kd-app']
        // }),
        // new CommonsChunkPlugin({
        //    name: ['manifest'],
        //    minChunks: Infinity,
        //  }),

        // new CommonsChunkPlugin({
        //     filename: "commons.js",
        //     name: ['kduser-app','kd-contract-app'].reverse()
        // }),


        // new webpack.optimize.CommonsChunkPlugin({
        //     name:"vendor",
        //     chunks:["app"],
        //     minChunks:function(e) {
        //         console.log(e);
        //         return true;
        //     }
        // }),
        // myWebpackPlugin,
        new ExtractTextPlugin('styles.css'),
    ]),
    module: {
        loaders: [{
            // apply the loader to setup module shimming
            test: /\.js/,
            loader: 'shim-loader',
            query: webpackShimConfig,
            // pass a list of directories or files to improve performance
            //includes:  path.join(__dirname, 'bower_components'),
        }, {
            test: /\.(ts|jsx|tsx)$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.scss$/i,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(['css-loader'])
        }, {
            test: /\.html$/,
            loader: 'raw-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)/,
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]',
                publicPath: '/'
            }
        },
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            // {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            // {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            // {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            // {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}


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