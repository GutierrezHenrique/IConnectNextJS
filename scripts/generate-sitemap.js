const sitemap = require('nextjs-sitemap-generator');
const path = require('path');

sitemap({
    baseUrl: 'https://www.example.com',
    pagesDirectory: path.join(__dirname, 'pages'),
    targetDirectory: path.join(__dirname, 'public'),
    ignoredExtensions: ['png', 'jpg', 'svg', 'js', 'ts', 'css', 'map', 'icon', 'json'],
    ignorePaths: [
        '404',
        'favicon',
        'index'
    ],
})