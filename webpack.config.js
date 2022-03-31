const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['regenerator-runtime/runtime.js', './public/src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    static: 'public/dist'
  }
}