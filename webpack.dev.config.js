/*
 * @Author: junjie pei 2607378033@qq.com
 * @Date: 2023-10-12 15:03:44
 * @LastEditors: junjie pei 2607378033@qq.com
 * @LastEditTime: 2023-10-14 14:00:22
 * @FilePath: \projectDemo\webpack.dev.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const webpack = require('webpack')
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base.config.js")

module.exports = merge(baseConfig, {
    mode: "development",
    devServer: {
        host: "172.16.180.166",
        port: "8099",
        // https: true,
        proxy: {
            "/api": {
                target: "http://172.16.180.199:8124",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                },
            },
            "/services/v1": {
                // target: "http://192.168.1.6:8123",
                target: "http://172.16.180.199:8124",
                changeOrigin: true,
                pathRewrite: {
                    '^/services/v1': '/v1'
                },
            },
        },
        // proxy: {
        //   '/': {
        //     target: 'http://localhost:9091',
        //     changeOrigin: true,
        //     secure: false
        //   }
        // },
        historyApiFallback: true,
        disableHostCheck: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
})