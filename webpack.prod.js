const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common,
  {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimizer: [
        // js minification - special syntax enabling webpack 5 default terser-webpack-plugin 
        new TerserPlugin({
          terserOptions: {
            compress: {
              // drop_console: true,
              drop_debugger: true,
              pure_funcs: [
                'console.debug',
                'console.log',
                'console.time',
                'console.timeEnd'
              ],
            }
          }
        })
      ]
    },
    plugins: [
      new ReplaceInFileWebpackPlugin([{
        dir: 'dist',
        files: ['sainplh-user-profile.php'],
        rules: [{
          search: '__SHUPP_DEV_MODE__',
          replace: 'false'
        }]
      }]),
    ]
  }
);