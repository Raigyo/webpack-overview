const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//Configuration
module.exports = {
  watch: true,
  mode: 'production',
	output: {
    path: path.resolve(__dirname, '..', "build"),
    filename: 'bundle.js'
  },
  devtool: "source-map",
  plugins: [
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