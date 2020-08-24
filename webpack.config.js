const HTMLPlugin = require('html-webpack-plugin');
const path = require("path");
const babelConfig = require('./.babelrc');



module.exports = {
  entry: './src/index.js',
  mode: 'development',
	output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  plugins: [
    new HTMLPlugin()
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

