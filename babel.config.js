module.exports = {
    presets: [
        '@vue/app'
    ],
    plugins: [
        ['import', { libraryName: 'vxe-table', style: true }, 'vxe-table'],
        ['import', { libraryName: 'vant', libraryDirectory: 'es', style: (e) => `${e}/style/less` }, 'vant'],
        ['import', { libraryName: 'ant-design-vue', libraryDirectory: "es", style: "css" }, 'ant-design-vue']
    ]
}