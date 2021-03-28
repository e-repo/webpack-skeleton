const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development';
const optimization = () => {
    const config = {
        // Бьем на чанки
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        runtimeChunk: 'single'
    };

    if (isDev) {
        config.minimize = true;
        config.minimizer = [
            new CssMinimizerPlugin()
        ];
    }

    return config;
}
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const cssLoaders = (extra) => {
    const config = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        {
            loader: 'css-loader',
        }
    ];
    if (extra) {
        config.push({
            loader: extra,
            options: {
                sourceMap: true,
            }
        });
    }
    return config;
}
const plugins = () => {
    const basePlugins = [
        new MiniCssExtractPlugin({
            filename: filename('css'),
            chunkFilename: filename('css'),
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            template: './index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'assets', to: 'assets' }]
        }),
        new ImageminWebpackPlugin({
            disable: isDev,
            test: /\.(jpe?g|png|gif|svg)$/i,
        }),
        new CleanWebpackPlugin()
    ]

    if (! isDev) {
        basePlugins.push(new BundleAnalyzerPlugin())
    }

    return basePlugins;
}

module.exports = {
    target: isDev ? "web" : "browserslist",

    // Режим работы
    // mode: 'development',

    // Контекст для исходников
    context: path.resolve(__dirname, 'src'),

    // Точка входа
    entry: {
        app: ['@babel/polyfill', './js/app.js'],
        some_script: './js/some_script.js',
    },

    // Точка выхода
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
        contentBase: './dist',
        port: 4200,
        hot: isDev,
    },

    // Оптимизация
    optimization: optimization(),

    // Разрешения
    resolve: {
        // Расширения по умолчанию
        extensions: ['.js', '.json'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },

    // Плагины
    plugins: plugins(),

    // Загрузчики
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                // На какой тип файла должен реагировать загрузчик
                test: /\.css$/i,
                // style-loader подключает стили в секцию head нашего html
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'file-loader',
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }
        ]
    }
};