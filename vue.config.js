const Path = require('path')
const Zlib = require('zlib')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
//const PrerenderSPAPlugin = require('prerender-spa-plugin')
//const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  productionSourceMap: false,
  transpileDependencies: ['simple-mind-map'],
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      /*
        config.plugins.push(
          new PrerenderSPAPlugin({
            staticDir: Path.join(__dirname, 'dist'),
            routes: [
              '/',
              '/miniapp',
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
      */

      config.optimization = {
        splitChunks: {
          chunks: 'all', //async 异步，initial 同步，all 同步或者异步
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 5,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            ant: {
              name: 'ant',
              test: /[\\/]node_modules[\\/]_?ant(.*)/,
              reuseExistingChunk: true,
              enforce: true,
              priority: 30
            },
            charts: {
              name: 'charts',
              test: /[\\/]node_modules[\\/](_?echarts|v\\-charts)(.*)/,
              reuseExistingChunk: true,
              enforce: true,
              priority: 30
            },
            vant: {
              name: 'vant',
              test: /[\\/]node_modules[\\/]_?vant(.*)/,
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
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              reuseExistingChunk: true,
              enforce: true,
              priority: 20
            },
            'common-async': {
              name: 'common-async',
              chunks: 'async',
              reuseExistingChunk: true,
              enforce: true,
              priority: -10
            },
            'common-initial': {
              name: 'common-initial',
              chunks: 'initial',
              reuseExistingChunk: true,
              enforce: true,
              priority: -10
            },
            default: {
              minChunks: 2,
              reuseExistingChunk: true,
              priority: -20
            }
          }
        }
      }

      config.externals = {
        qc: 'QC'
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end()
      }

      config
        .plugin('compression-webpack-plugin')
        .use(new CompressionWebpackPlugin({
          filename: '[path].br[query]',
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          compressionOptions: {
            params: {
              [Zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
          },
          threshold: 5120,
          minRatio: 0.8,
          deleteOriginalAssets: false
        }))

      config.plugins.delete('prefetch')

      config.resolve.alias
        .set('@ant-design/icons/lib/dist$', Path.resolve(__dirname, './src/assets/import/antd-icons.js'));
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: 'true; @import "' + Path.resolve(__dirname, './src/assets/less/config.less') + '";'
        }
      }
    },
    extract: false
  },
  pwa: {
    name: '苏苏的荣耀助手 - 全局BP模拟器',
    short_name: '荣耀助手',
    themeColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent'
  }
}