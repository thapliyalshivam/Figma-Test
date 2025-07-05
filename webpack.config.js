const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode || 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { 
                targets: { browsers: ['last 2 versions'] }
              }],
              ['@babel/preset-react', { 
                runtime: 'automatic' 
              }]
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'ui.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui-template.html',
      filename: 'ui.html',
      inject: 'body'
    })
  ],
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  optimization: {
    minimize: argv.mode === 'production',
  },
});