const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';
console.log(process.env.NODE_ENV);
console.log(isDevelopment);

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  devServer: {
    historyApiFallback: true,
  },
  target: 'web',
  devtool: isDevelopment && 'source-map',
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    isDevelopment && new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_BACKEND_URL': JSON.stringify(
        process.env.REACT_APP_BACKEND_URL
      ),
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ],
  resolve: {
    modules: [__dirname, 'src', 'node_modules'],
    extensions: ['.*', '.js', '.jsx', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [
            isDevelopment && require.resolve('react-refresh/babel'),
          ].filter(Boolean),
        },
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
