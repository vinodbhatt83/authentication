const path = require('path');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: {
    fbsAthenticationService: './src/fbs-authentication.service.js',
    init: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js',
    publicPath: path.resolve(),
    libraryTarget: 'umd',
    library: 'fbs-authentication',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, path.resolve(__dirname, 'index.js')],
        loader: 'babel-loader',
      },
    ],
  },
};
