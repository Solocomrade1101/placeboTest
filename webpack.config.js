const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/js/main.js',
        output: {
            filename: 'bundle.[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader'
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                context: 'src'
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                disable: !isProduction, // Отключить оптимизацию в режиме разработки
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65,
                                },
                                optipng: {
                                    enabled: true,
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4,
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                webp: {
                                    quality: 75,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|ttc|otf)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                context: 'src'
                            },
                        },
                    ],
                },
                {
                    test: /\.html$/,
                    use: ['html-loader'],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                minify: isProduction ? {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                } : false
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
        ],
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
            open: true,
            hot: true,
        },
        devtool: isProduction ? 'source-map' : 'inline-source-map',
    };
};
