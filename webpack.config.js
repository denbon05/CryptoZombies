const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: process.env.NODE_ENV || 'development',
  plugins: [new Dotenv()],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};
