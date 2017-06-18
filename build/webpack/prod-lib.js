import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import mediaPacker from 'css-mqpacker';
import config from '../config';
import baseConfig from './base';

const version = process.env.VERSION || require('../../package.json').version;

function getDirectories(src) {
  return fs.readdirSync(src).filter((file) => {
    return fs.statSync(path.join(src, file)).isDirectory();
  });
}

const componentsPath = 'src/components';
const components = getDirectories(path.resolve(__dirname, '../../', componentsPath));

baseConfig.entry = {
  'MSUi': ['./src/index.js']
};

components.forEach((component) => {
  baseConfig.entry[path.join('components', component, 'index')] = ['./' + path.join(componentsPath, component)];
});

export default merge(baseConfig, {
  output: {
    path: config.rootPath,
    filename: '[name].js',
    library: 'MSUi',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            })
          },
          postcss: [
            autoprefixer({
              browsers: ['last 3 versions', 'not IE < 10']
            }),
            mediaPacker()
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'vue-style-loader'
        })
      }
    ]
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue',
      var: 'Vue'
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    }),
    new webpack.BannerPlugin({
      banner: `/*!
* Vue MSUi v${version}
* Made with love by Memeshare
* Released under the MIT License.
*/   `,
      raw: true,
      entryOnly: true
    }),
    new ExtractTextPlugin('[name].css'),
    new OptimizeCssAssetsPlugin()
  ]
});
