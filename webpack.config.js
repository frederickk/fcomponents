const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const {ESBuildMinifyPlugin} = require('esbuild-loader');

const mode = (process.env.NODE_ENV === 'production')
  ? 'production'
  : 'development';

// Weback configuration.
module.exports = {
  mode,
  entry: Object.assign({
    index: [
      path.join(__dirname, './index'),
      path.join(__dirname, './index.scss'),
    ],
  }),
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)?$/i,
      loader: 'esbuild-loader',
      options: {
        loader: 'ts',
        target: 'es2015'
      }
    },
    {
      test: /\.css|\.s(c|a)ss$/,
      use: [
        {
          loader: 'lit-scss-loader',
          options: {
            minify: true, // defaults to false
          },
        },
        'extract-loader',
        'css-loader',
        'sass-loader'
      ],
      include: [
        path.resolve(__dirname, 'components'),
      ],
    },
    {
      test: /\.(sa|sc|c)ss$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      exclude: [
        path.resolve(__dirname, 'components'),
      ],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: () => {
        return '[name].min.css';
      },
    }),
    {
      apply: (compiler) => {
        if (mode === 'production') {
          compiler.hooks.done.tap('DonePlugin', (_stats) => {
            setTimeout(() => {
              process.exit(0);
            });
          });
        } else {
          return;
        }
      }
    }
  ],
  optimization: {
    minimize: true,
    minimizer: [new ESBuildMinifyPlugin({
      target: 'es2015',
      css: true
    })],
  },
  output: {
    path: path.join(__dirname, ''),
    publicPath: path.join(__dirname, ''),
    filename: '[name].min.js',
    assetModuleFilename: '[name][ext]',
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
};
