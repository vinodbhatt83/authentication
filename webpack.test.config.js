const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        include: [
          path.join(__dirname, './src'),
          path.join(__dirname, './test'),
        ],
      },
      {
        test: /\.js$|\.jsx$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true },
        },
        enforce: 'post',
        exclude: /node_modules|\.spec\.js$/,
      },
    ],
  },

  devtool: 'inline-source-map',
};
