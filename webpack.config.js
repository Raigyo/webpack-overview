const path = require("path");
const HTMLPlugin = require('html-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const dev = process.env.NODE_ENV === "dev"


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
    new HTMLPlugin(/*{
      hash: true,
      title: 'My Awesome application',
      myPageHeader: 'Hello World',
      template: './src/template.html',
      filename: './build/index.html' //relative to root of the application
    }*/)
  ],
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			}
		}]
  }
}

if (!dev) {
  config.plugins.push(new TerserPlugin({
    sourceMap: true
  }))
}

module.exports = config;