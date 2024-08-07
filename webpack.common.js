const path = require('path');
// css extraction and minification
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// clean out build dir in-between builds
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

// Variables
const outputPath = 'dist';

const entryPoints = {
  'public/css/index': './src/public/css/index.scss',
  'public/js/index': './src/public/js/index.ts',
  // 'admin/css/main': './src/admin/css/main.scss',
  // 'admin/js/main': './src/admin/js/main.ts'
};

module.exports = {
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: '[name].js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      // js babelization
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ["*", ".js"],
        }
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // sass compilation
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
      },
    ]
  },
  plugins: [
    // clear out build directories on each build
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [
        outputPath + '/public/*',
        outputPath + '/admin/*',
        outputPath + '/*'
      ]
    }),
    // css extraction into dedicated file
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          context: './src',
          from: './**/*.php',
          to: '[path][name][ext]',
          globOptions: {
            ignore: ['**/node_modules/**'],
          },
        },
        {
          context: './src',
          from: './**/assets/*',
          to: '[path][name][ext]',
          globOptions: {
            ignore: ['**/node_modules/**'],
          },
        }
      ],
    }),
  ],
};