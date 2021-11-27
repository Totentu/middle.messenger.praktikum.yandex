// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCss = require('mini-css-extract-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sprint4.js'
  },
  resolve: {
    extensions: ['.html', '.ts', '.js', '.json']
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          MiniCss.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json')
            }
          }
        ],
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'img', to: 'img'
        }
      ]
    }),
    new MiniCss({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      title: 'Спринт 4',
      template: 'index.html'
    })
  ]
};
