const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/css/app.scss', './src/index.js']
        //the entry is the name given to the files in build, here 'main'
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
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[name].[hash:7].[ext]'
              },
            },
          ],
        },
      ],
    },
};