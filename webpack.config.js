var path = require('path');
var webpack = require('webpack');

var minimize = process.argv.indexOf('--minimize') !== -1;
var plugins = [];

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

var config = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: './build'
  },
  module: {
    loaders: [
      {
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: plugins,
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  resolve: {
    modulesDirectories: ['node_modules', './src/shared'],
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'eval-source-map'
};

module.exports = config;
