module.exports = {
    productionSourceMap: false,
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
        appleMobileWebAppStatusBarStyle: 'default',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js',
            importWorkboxFrom: 'disabled',
            importScripts: 'https: //api.91m.top/hero/v1/app/public/js/workbox-sw.js'
        }
    }
}