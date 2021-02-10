const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
    productionSourceMap: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization = {
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        vant: {
                            name: 'vant',
                            test: /[\\/]node_modules[\\/]_?vant(.*)/,
                            reuseExistingChunk: true,
                            enforce: true,
                            priority: 30
                        },
                        ant: {
                            name: 'ant',
                            test: /[\\/]node_modules[\\/]_?ant(.*)/,
                            reuseExistingChunk: true,
                            enforce: true,
                            priority: 30
                        },
                        vxe: {
                            name: 'vxe',
                            test: /[\\/]node_modules[\\/](_?vxe|_?xe)(.*)/,
                            reuseExistingChunk: true,
                            enforce: true,
                            priority: 30
                        },
                        echarts: {
                            name: 'echarts',
                            test: /[\\/]node_modules[\\/]_?echarts(.*)/,
                            reuseExistingChunk: true,
                            enforce: true,
                            priority: 30
                        },
                        vendors: {
                            name: 'vendors',
                            test: /[\\/]node_modules[\\/]/,
                            reuseExistingChunk: true,
                            enforce: true,
                            priority: 20
                        },
                        commons: {
                            name: 'commons',
                            chunks: 'async',
                            reuseExistingChunk: true,
                            enforce: true,
                            priority: 10
                        }
                    }
                }
            }

            return {
                plugins: [
                    new CompressionPlugin({
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
                        threshold: 10240,
                        minRatio: 0.8,
                        deleteOriginalAssets: false
                    })
                ]
            }
        }
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end()

                config.plugins.delete('prefetch')

                config.resolve.alias
                    .set('@ant-design/icons/lib/dist$', path.resolve(__dirname, './src/assets/import/ant-icons.js'))
            }
        }
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    pwa: {
        name: '苏苏的荣耀助手 - 全局BP模拟器',
        short_name: '荣耀助手',
        themeColor: '#000000',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default'
    }
}