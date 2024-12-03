const path = require('path'); // Модуль для работы с путями
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Плагин для генерации HTML
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Плагин для копирования файлов

module.exports = {
    mode: 'development', // Режим разработки ('production' для финальной сборки)
    entry: './src/assets/js/main.js', // Главный JavaScript файл, с которого начинается сборка
    output: {
        path: path.resolve(__dirname, 'build'), // Директория для итоговых файлов
        filename: 'bundle.js', // Имя собранного JavaScript файла
        publicPath: '/', // Базовый путь для всех файлов сборки
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Для обработки CSS-файлов
                use: ['style-loader', 'css-loader'], // Загружает CSS и вставляет их в DOM
            },
            {
                test: /\.html$/, // Для обработки HTML-файлов
                use: ['html-loader'], // Загружает HTML и корректирует пути к ресурсам
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pages/index.html', // Шаблон HTML-файла для генерации
            filename: 'index.html', // Имя выходного HTML-файла
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/components'), // Исходная папка с компонентами
                    to: path.resolve(__dirname, 'build/components'), // Целевая папка для копирования
                },
                {
                    from: path.resolve(__dirname, 'src/assets'), // Исходная папка с ассетами
                    to: path.resolve(__dirname, 'build/assets'), // Целевая папка для копирования ассетов
                },
            ],
        }),
    ],
    devtool: 'source-map', // Включает source maps для отладки
    devServer: {
        static: path.resolve(__dirname, 'build'), // Директория для статических файлов
        compress: true, // Включает сжатие для ускорения загрузки
        port: 8080, // Устанавливает порт для локального сервера
        open: true, // Автоматически открывает браузер при запуске сервера
        historyApiFallback: true, // Перенаправляет запросы на index.html (для SPA)
    },
};
