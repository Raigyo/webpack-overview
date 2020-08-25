const path = require("path");
const HTMLPlugin = require('html-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const dev = process.env.NODE_ENV === "dev";


//Only use postcss-loader in production
let cssLoaders = [
  'style-loader', 
  'css-loader'
  //'postcss-loader', 'sass-loader'
]

if (!dev) {
  cssLoaders.push({
    loader: 'postcss-loader'
  })
}

//Configuration
let config = {
  entry: './src/index.js',
  watch: dev,
  mode: 'development',
	output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  devtool: dev ? "eval-cheap-module-source-map" : "source-map",
  plugins: [
    new HTMLPlugin({
      hash: true,
      title: 'My Awesome application',
      myPageHeader: 'Hello World',
      template: './src/template.html',
      filename: './index.html' //relative to root of the application
    })
  ],//\plugins
	module: {
		rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/i,
        //use: ['style-loader', 'css-loader'],
        //loader on the right loaded first, respect the logical order
        use: cssLoaders
      },
      {
        test: /\.scss$/i,
        //use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        use: [
          ...cssLoaders,
          'sass-loader'
        ]
      }
    ]//\rules
  }//\modules
}//\config

//Only use TerserPlugin in production
if (!dev) {
  config.plugins.push(new TerserPlugin({
    sourceMap: true
  }))
}


module.exports = config;