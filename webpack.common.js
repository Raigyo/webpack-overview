const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        title: 'My Awesome application',
        myPageHeader: 'Hello World',
        template: './src/template.html',
        filename: './index.html' //relative to root of the application
      })
    ],
};