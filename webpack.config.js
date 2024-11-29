const path = require('path'); // Подключение встроенного модуля Node.js для работы с путями
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Подключение плагина для автоматической генерации HTML-файлов
const fs = require('fs'); // Подключение встроенного модуля Node.js для работы с файловой системой

// Функция для автоматического создания экземпляров HtmlWebpackPlugin для всех HTML-файлов в папке src/pages
const generateHtmlPlugins = () => {
    const pagesDir = path.resolve(__dirname, 'src/pages'); // Абсолютный путь к папке src/pages
    const pages = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html')); // Получение всех HTML-файлов из папки src/pages

    return pages.map(page => { // Для каждого найденного HTML-файла
        return new HtmlWebpackPlugin({
            template: path.join(pagesDir, page), // Путь к исходному файлу
            filename: page, // Имя выходного файла совпадает с именем исходного
        });
    });
};

module.exports = {
    mode: 'development', // Режим сборки (development для разработки, production для финальной версии)
    entry: './src/assets/js/main.js', // Главный файл JavaScript, с которого начинается сборка
    output: {
        path: path.resolve(__dirname, 'build'), // Папка для итоговых файлов сборки
        filename: 'bundle.js', // Имя собранного JavaScript-файла
        publicPath: '/', // Базовый путь для всех файлов, используемый в итоговом HTML
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Проверка на соответствие расширению .css
                use: ['style-loader', 'css-loader'], // Загрузчики: добавление CSS в DOM и чтение CSS-файлов
            },
            {
                test: /\.html$/, // Проверка на соответствие расширению .html
                use: ['html-loader'], // Загрузчик для обработки HTML (корректировка ссылок на ресурсы)
            },
        ],
    },
    plugins: [
        ...generateHtmlPlugins(), // Добавление всех автоматически созданных экземпляров HtmlWebpackPlugin
    ],
    devtool: 'source-map', // Генерация source maps для удобной отладки
    devServer: {
        static: path.resolve(__dirname, 'build'), // Папка с файлами, которые будут раздаваться сервером разработки
        compress: true, // Включение сжатия для ускорения загрузки
        port: 8080, // Порт, на котором будет запущен сервер разработки
        open: true, // Автоматическое открытие браузера при запуске сервера
        historyApiFallback: true, // Перенаправление всех запросов на index.html (удобно для SPA)
    },
};
