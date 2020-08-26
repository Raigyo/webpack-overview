const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        title: 'Webpack overview',
        myPageHeader: 'Webpack overview',
        myEnv: 'Webpack environment: ',
        template: './src/template.html',
        filename: './index.html' //relative to root of the application
      })
    ],
};