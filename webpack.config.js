const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')

module.exports = {
  // 设置开发模式
  mode: 'development',
  // 方便查看打包后的源代码
  devtool: 'inline-source-map',
  // 入口文件
  entry: './src/main.js',
  // 出口文件
  output: {
    // 文件夹
    path: path.resolve(__dirname, 'dist'),
    // 文件名
    filename: 'bundle.js',
    // 随机文件名
    // filename: '[name].[contenthash].js',
  },
  // 设置路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // webpack-dev-server 配置
  devServer: {
    // 自定打开
    open: true,
    // 运行的端口号
    port: 8000,
  },
  // 压缩代码的配置
  optimization: {
    // 是否要压缩
    minimize: true,
    // 使用什么工具进行压缩
    minimizer: [new TerserWebpackPlugin()],
  },
  // plugins插件配置
  plugins: [
    // 自动引入资源文件
    new HtmlWebpackPlugin({
      // 告诉webpack使用插件时, 以我们自己的html文件作为模板去生成dist/html文件
      template: 'public/index.html',
    }),
    // 打包分析工具（会自定打开）
    // new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
  ],
  // 加载器配置
  module: {
    // loader的规则
    rules: [
      {
        // 匹配所有的css文件，i表示忽略大小写
        test: /\.css$/i,
        // use数组里从右向左运行
        // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
        // 再用 style-loader 将样式, 把css插入到dom中
        use: ['style-loader', 'css-loader'],
      },
      {
        // 图片文件的配置(仅适用于webpack5版本)
        test: /\.(gif|png|jpg|jpeg)$/i,
        // 匹配上面的文件后, webpack会把他们当做静态资源处理打包
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        // 不去匹配这些文件夹下的文件
        exclude: /(node_modules|bower_components)/,
        use: {
          // 使用这个loader处理js文件
          loader: 'babel-loader',
          // 加载器选项
          options: {
            // 预设: @babel/preset-env 降级规则-按照这里的规则降级我们的js语法
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
