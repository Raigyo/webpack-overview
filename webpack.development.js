const path = require("path");
//const HtmlWebpackPlugin = require('html-webpack-plugin');

//Configuration
module.exports = {
  //entry: './src/index.js',
  watch: true,
  mode: 'development',
	output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  devtool: "eval-cheap-module-source-map",
  /*plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'My Awesome application',
      myPageHeader: 'Hello World',
      template: './src/template.html',
      filename: './index.html' //relative to root of the application
    })
  ],//\plugins*/
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
        sideEffects: true,
        use: ['style-loader', 'css-loader'],
        //loader on the right loaded first, respect the logical order
      },
      {
        test: /\.scss$/i,
        sideEffects: true,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]//\rules
  }//\modules
}//\module export

