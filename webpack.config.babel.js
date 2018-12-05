import path from 'path';
import HTMLwebpackplugin from 'html-webpack-plugin';

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: '[name].[hash:4].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLwebpackplugin({
      filename: 'index.html',
      title: 'Welcome to React starter kit',
      hash: true,
      template: './index.html',
      inject: 'body'
    })
  ]
};

export default config;