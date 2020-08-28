const path = require("path");

//Configuration
module.exports = {
  watch: true,
  mode: 'development',
	output: {
    path: path.resolve(__dirname, '..', "dist"),
    filename: '[name].js',
  },
  devtool: "eval-cheap-module-source-map",
  plugins: [

  ],//\plugins*/
	module: {
		rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
        }
      },
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
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      },
    ]//\rules
  }//\modules
}//\module export

