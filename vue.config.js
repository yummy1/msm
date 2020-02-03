module.exports = {
    devServer: {
        port: 8001,
        host: 'localhost',
        https: false,
        open: true,//启动服务时自动打开浏览器访问
        proxy: {//代理配置
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_SERVICE_URL,//目标服务器地址
                changeOrigin: true,//开启代理服务器
                pathRewrite: {
                    [ '^' + process.env.VUE_APP_BASE_API]: '',
                }
            }
        }
    },
    lintOnSave: true,//格式检查
    productionSourceMap: false,//打包时不会生成.map文件，加快打包速度
}