const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    // 入口文件
    entry: "./src/index.js",
    output: {
        filename: "bundle.[hash].js",
        path: path.join(__dirname, "/dist"),
    },
    resolve: {
        alias: {
            "@store": path.resolve(__dirname, "src/store.js"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@components": path.resolve(__dirname, "src/components"),
            "@server": path.resolve(__dirname, "src/services"),
            "@assets": path.resolve(__dirname, "src/assets"),
        },
    },
    module: {
        // 配置相应的规则
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: {
                                "table-header-bg": "#DDE9F9",
                                "modal-header-bg": "#DDE9F9",
                                "btn-primary-bg": "#1D66C9",
                                "btn-default-color": "#1D66C9",
                                "pagination-item-bg-active": "#1D66C9",
                                "pagination-item-link-bg": "#F1F5F8",
                            },
                            javascriptEnabled: true,
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(ttf|eot|woff|woff2|xls|xlsx)$/,
                use: "url-loader",
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: "url-loader",
                        // loader: 'file-loader',
                        options: {
                            esModule: false, // 这里设置为false
                            name: "[name].[ext]",
                            limit: 5120,
                            outputPath: "./images",
                            publicPath: "/images",
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            name: "[name].[ext]",
                            outputPath: "./images",
                            publicPath: "/images",
                        },
                    },
                ],
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            }
        ],
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    // 配置相应的插件
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CleanWebpackPlugin(),
    ],
}