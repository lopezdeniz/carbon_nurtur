const path = require('path'); // Модуль для работы с путями в файловой системе

module.exports = {
    mode: 'development', // Устанавливаем режим разработки ('production' для финальной сборки)
    entry: './src/assets/js/main.js', // Главный файл JavaScript, с которого начинается сборка
    output: {
        path: path.resolve(__dirname, 'build'), // Путь для итоговых файлов
        filename: 'bundle.js', // Имя собранного файла JavaScript
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Указывает, как обрабатывать файлы .css
                use: ['style-loader', 'css-loader'], // Подключает style-loader и css-loader
            },
        ],
    },
    devtool: 'source-map', // Генерация source maps для отладки
    devServer: {
        static: path.resolve(__dirname, 'public'), // Папка, откуда сервер будет раздавать файлы
        compress: true, // Включает сжатие для ускорения загрузки
        port: 8080, // Порт, на котором будет запущен сервер
    },
};
