var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: ['./src/App.jsx'],
  output: {
    path: './lib/app/public',
    filename: 'app.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]"} ,
      { test: /\.css$/, loaders : ["style-loader", "css-loader?localIdentName=[name]-[local]-[hash:base64:5]"], exclude: /node_modules\/(?!@juspay)/},
      { test: /\.js$/, loaders: ['react-hot', 'babel?stage=0'], exclude: /node_modules\/(?!@juspay)/ },
      { test: /\.jsx$/, loaders: ['jsx-loader', "babel-loader?stage=0"] },
      { test: /\.png$/, loader: "url-loader?limit=100000",  exclude: /node_modules\/(?!@juspay)/}
    ]
  }
};