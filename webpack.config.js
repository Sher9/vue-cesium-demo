const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => ({
    entry: {
        'auth/build/bundle': './auth/src/main.js',
        'home/build/bundle': './home/src/main.js',
        'screen/build/bundle': './screen/src/main.js',
        'bigscreen/build/bundle': './bigscreen/src/main.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './'),
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                exclude: /(node_modules|static)/,
                use: 'eslint-loader',
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                    },
                ],
            },

            {
                //忽略min.css
                test: /^((?!\.min\.css).)*\.css/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../',
                        },
                    },
                    'css-loader',
                ],
            },
            {
                //单独匹配min.css,压缩过的min.css就不会被压缩了。
                test: /\.min\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../',
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, //在代码中引用静态资源中的图片，用require才会打包。
                            name: '[path][name].[ext]', //超出8k的图片将单独打包到指定目录并按照一定规则重命名
                        },
                    },
                ],
            },
            {
                test: /\.(mp4)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'audios/[name].[ext]',
                    limit: 10,
                },
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
        },
    },
    devServer: {
        host: '0.0.0.0',
        overlay: true,
        open: true,
        port: '8087',
    },
    devtool: argv.mode === 'development' ? 'source-map' : '',
})
