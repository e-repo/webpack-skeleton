const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // Режим работы
    // mode: 'development',

    // Контекст для исходников
    context: path.resolve(__dirname, 'src'),

    // Точка входа
    entry: {
        app: './app.js'
    },

    // Точка выхода
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },

    // Плагины
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],

    // Загрузчики
    module: {
        rules: [
            {
                test: /\.css$/,
                // style-loader подключает стили в секцию head нашего html
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};