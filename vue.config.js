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
        name: '荣耀助手',
        themeColor: '#000000',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default'
    }
}