const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  mode: 'development',

  entry: {
    react: 'react',
    'react-dom': 'react-dom',
    'react-router-dom': 'react-router-dom',
    vendor: ['crypto-js'],
    app: './src/index.tsx',
  },

  output: {
    filename: '[name].[hash:9].js',
    chunkFilename: '[name].[chunkhash:9].js',
    path: path.resolve(__dirname, 'dist'),
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8866,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new ManifestPlugin({
      writeToFileEmit: true,
      publicPath: 'http://localhost:8866/',
    }),
  ],

  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.json' ],
  },

  stats: {
    colors: true,
  },
};
