// Node.js的path模块来处理路径信息
const path = require('path');
const config = {
    // 选择开发环境还是生产环境
    mode: 'development',
    // 打包的主入口文件
    // entry: path.resolve(__dirname, 'src/index.js'),
    entry: path.resolve(__dirname, 'src/test.jsx'),
    // 编译的产出文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    // webpack如何编译我们的代码
    module: {
        rules: [{
            //用来匹配所有的文件
            // test: /\.js$/,
            test: /\.jsx$/,
            //编译时需要忽略的文件
            exclude: /node_modules/,
            //定义loader
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                    plugins: ['transform-decorators-legacy','transform-class-properties'],
                }
            }
        }]
    },
    //为了方便调试
    devtool: 'inline-source-map'
}

module.exports = config;