const path = require('path'); // Подключение модуля для работы с путями

module.exports = {
    mode: 'development', // Устанавливаем режим ('development' или 'production')
    entry: './src/assets/js/main.js', // Главный файл JavaScript
    output: {
        path: path.resolve(__dirname, 'build'), // Папка для итоговых файлов
        filename: 'bundle.js', // Имя итогового JavaScript файла
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Указывает, как обрабатывать файлы .css
                use: ['style-loader', 'css-loader'], // Подключение загрузчиков для CSS
            },
        ],
    },
    devtool: 'source-map', // Генерация source maps для удобной отладки
    devServer: {
        static: path.resolve(__dirname, 'public'), // Папка с статическими файлами
        compress: true, // Сжатие для ускорения загрузки
        port: 8080, // Порт для локального сервера
        open: true, // Автоматическое открытие браузера
    },
};
