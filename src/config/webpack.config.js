const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // Используйте 'production' для финальной сборки
    entry: './src/assets/js/main.js', // Главный файл
    output: {
        path: path.resolve(__dirname, 'build'), // Папка для итоговых файлов
        filename: 'bundle.js', // Имя собранного файла
        clean: true, // Очищает папку build перед каждой сборкой
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Используем HTML из папки public
        }),
    ],
    devtool: 'source-map',
    devServer: {
        static: path.resolve(__dirname, 'public'),
        compress: true,
        port: 8080,
        open: true, // Автоматически открывает браузер
    },
};
