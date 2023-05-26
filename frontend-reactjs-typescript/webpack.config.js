const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = (webpackEnv, options) => {
  const isEnvProduction = options.mode === 'production';
  // Get env file based on passed --mode option. See package,json scripts
  const envFilename = '.env' + (isEnvProduction ? '' : '.' + options.mode);
  const envPath = path.join(__dirname, envFilename);
  const processEnv = dotenv.config({ path: envPath }).parsed;
  const outputPath = path.resolve(__dirname, 'build');
  console.info('\x1b[36m' + '> REACT ENV:', envFilename, '\x1b[0m\n');
  console.info('\x1b[36m' + '> Output path:', outputPath, '\x1b[0m\n');
  return {
    devtool: isEnvProduction ? undefined : 'source-map',
    // redirect all server requests to /index.html
    devServer: {
      historyApiFallback: true,
    },
    entry: './src/index.tsx',
    output: {
      path: outputPath,
      filename: 'bundle.js',
      // redirect all server requests to /index.html
      publicPath: '/',
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      alias: {
        react: path.join(__dirname, 'node_modules', 'react'),
        // Custom modules import alias
        // Always add it also to tsconfig.json
        '@': path.join(__dirname, './src/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: ['.ts', '.tsx', '.js', '.scss', '.json'],
          },
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
        {
          test: /\.(png|jpg|woff|woff2|eot|otf|ttf)$/,
          use: ['url-loader?limit=100000'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        // it will automatically pick up key values from .env file
        'process.env': JSON.stringify(processEnv),
      }),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // It will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin({ PUBLIC_URL: processEnv.PUBLIC_URL }),
    ],
    stats: 'errors-warnings',
  };
};
