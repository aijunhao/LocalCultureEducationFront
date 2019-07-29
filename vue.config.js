const webpack = require("webpack");

module.exports = {
  // 基本路径配置，即原先的 baseUrl，默认是 '/'，打包会出错
  publicPath: "/",
  // 打包文件输出目录
  outputDir: "dist",
  // 打包之后静态资源的目录
  assetsDir: "assets",
  // 是否使用eslint
  lintOnSave: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",

        jQuery: "jquery",

        "windows.jQuery": "jquery"
      })
    ]
  },
  // webpack-dev-server 相关配置
  devServer: {
    // 运行项目后自动打开浏览器
    open: true,
    // 服务器地址
    host: "127.0.0.1",
    // 端口号
    port: 3003,
    https: false,
    // 热更新
    hotOnly: false
    // 跨域请求
    // proxy: {
    //   "http://127.0.0.1:3000/": {
    //     target: "http://127.0.0.1:3000/",
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
  }
};
