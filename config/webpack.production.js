const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//Configuration
module.exports = {
  watch: true,
  mode: 'production',
	output: {
    path: path.resolve(__dirname, '..', "build"),
    filename: '[name].[chunkhash:8].js',
    //Cache invalidation can be achieved by including a hash to the filenames
    publicPath: '/build/'
  },
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
    new TerserPlugin({
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({}),
    new ManifestPlugin(),
    new CleanWebpackPlugin(['build'], {
      root: path.resolve('./'),
      verbose: true,
      dry: true
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