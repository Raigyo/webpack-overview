const path = require("path");
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//Configuration
module.exports = {
  //entry: './src/index.js',
  watch: true,
  mode: 'production',
	output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  devtool: "source-map",
  plugins: [
    /*new HtmlWebpackPlugin({
      hash: true,
      title: 'My Awesome application',
      myPageHeader: 'Hello World',
      template: './src/template.html',
      filename: './index.html' //relative to root of the application
    }),*/
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new TerserPlugin({
      sourceMap: true
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
        sideEffects: true,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader'
        ],
      },
      {
        test: /\.scss$/i,
        sideEffects: true,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      }
    ]//\rules
  }//\modules
}//\module export