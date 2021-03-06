import { resolve } from "path";
import * as webpack from "webpack";
import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import * as HtmlWebPackPlugin from "html-webpack-plugin";

export default {
    mode: "development",
    context: __dirname,
    entry: "./src/index.tsx",
    stats: "none",
    output: {
        publicPath: "/",
        path: resolve(__dirname, "./dist"),
        filename: "bundle.js",
    },
    resolve: {
        modules: ["node_modules", "./src"],
        extensions: [".js", ".ts", ".tsx", ".css" ],
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [
                    /node_modules/,
                ],
                use: [
                    {
                        loader: "cache-loader",
                    }, {
                        loader: "thread-loader",
                        options: {
                            workers: 1
                        }
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            babelrc: false,
                            presets: [
                                [
                                    "@babel/preset-env",
                                    { targets: { browsers: "defaults" } }
                                ],
                                "@babel/preset-typescript",
                                "@babel/preset-react",
                            ],
                            plugins: [
                                ["@babel/plugin-proposal-class-properties", { loose: true }],
                                "@babel/plugin-proposal-object-rest-spread",
                                "react-hot-loader/babel"
                            ],
                        }
                    }
                ],
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
                exclude: [
                    /node_modules/,
                    /dist/
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.(png|jpe?g|svg|ico)$/,
                loader: "file-loader",
                options: {
                    name: "assets/[name].[ext]",
                }
            }
        ]
    },
    plugins: [
         new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new webpack.NamedModulesPlugin(),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: "./tsconfig.json",
            useTypescriptIncrementalApi: true,
            memoryLimit: 2048
        })
    ],
    devServer: {
        contentBase: resolve(__dirname, "./dist"),
        historyApiFallback: true,
        watchContentBase: true,
        writeToDisk: true,
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: true,
            publicPath: true
        },
        port: 8080
    },
    devtool: "source-map"
};
