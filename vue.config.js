const zlib = require("zlib")
const Path = require("path")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
    productionSourceMap: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                new PrerenderSPAPlugin({
                    staticDir: Path.join(__dirname, 'dist'),
                    routes: [
                        '/',
                        '/miniapp',
                        '/skin/return',
                        '/search',
                        '/my',
                        '/setting'
                    ],
                    renderer: new Renderer({
                        inject: {
                            foo: 'bar'
                        },
                        headless: true,
                        renderAfterDocumentEvent: 'render-event'
                    })
                })
            );

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

        config.externals = {
            qc: "QC"
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
                    test: /\.(html|js|css)$/i,
                    compressionOptions: {
                        params: {
                            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                        },
                    },
                    threshold: 5120,
                    minRatio: 0.8,
                    deleteOriginalAssets: false
                }))
                .end()

            config.plugins.delete('prefetch')

            config.resolve.alias
                .set('@ant-design/icons/lib/dist$', Path.resolve("./src/assets/import/ant-icon.js"))
                .end()
        }
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    'hack': `true; @import "${Path.join(__dirname, './src/assets/less/config.less')}";`,
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