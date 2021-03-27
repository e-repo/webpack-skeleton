const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
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
        new CopyWebpackPlugin({
            patterns: [{ from: 'assets', to: 'assets' }]
        }),
        new ImageminWebpackPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
        }),
        new CleanWebpackPlugin()
    ],

    // Загрузчики
    module: {
        rules: [
            {
                // На какой тип файла должен реагировать загрузчик
                test: /\.css$/i,
                // style-loader подключает стили в секцию head нашего html
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset',
            }
        ]
    }
};