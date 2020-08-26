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

