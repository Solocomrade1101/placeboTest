const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/js/main.js',
        output: {
            filename: 'bundle.[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        mode: isProduction ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader' // добавьте sass-loader
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[name].[contenthash][ext]'
                    }
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/[name].[contenthash][ext]'
                    }
                },
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                minify: isProduction ? {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                } : false
            }),
            new MiniCssExtractPlugin({
                filename: 'styles/[name].[contenthash].css',
            }),
        ],
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(), // Add CssMinimizerPlugin here
                new TerserPlugin(),
            ],
        },
        // devServer configuration...
        devtool: isProduction ? 'source-map' : 'inline-source-map',
    };
};
