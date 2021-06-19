const path = require("path")
const zlib = require("zlib")
const CompressionWebpackPlugin = require("compression-webpack-plugin")

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
        }
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end()
            }

            config
                .plugin('compression-webpack-plugin')
                .use(new CompressionWebpackPlugin({
                    filename: '[path].br[query]',
                    algorithm: 'brotliCompress',
                    test: /\.(js|css|html)$/i,
                    compressionOptions: {
                        params: {
                            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                        },
                    },
                    threshold: 10240,
                    minRatio: 0.5,
                    deleteOriginalAssets: false
                }))
                .end()

            config.plugins.delete('prefetch')

            config.resolve.alias
                .set('@ant-design/icons/lib/dist$', path.resolve("./src/assets/import/ant-icon.js"))
                .end()
        }
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    'hack': `true; @import "${path.join(__dirname, './src/assets/less/config.less')}";`,
                }
            }
        }
    },
    pwa: {
        name: '苏苏的荣耀助手 - 全局BP模拟器',
        short_name: '荣耀助手',
        themeColor: '#000000',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black-translucent'
    }
}