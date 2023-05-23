import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDevMode = process.env.webpackMode === 'development';

const pluginsRes = [];
if (isDevMode) {
  pluginsRes.push(
    new HtmlWebpackPlugin({
      template: 'src/html/template.html',
      inject: true,
    }),
  );
} else {
  pluginsRes.push(
    new HtmlWebpackPlugin({
      template: 'src/html/template.html',
      inject: true,
    }),
    new MiniCssExtractPlugin(),
  );
}

const config = () => ({
  mode: process.env.webpackMode,
  entry: './index.jsx',
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: '[name].bundle.js',
    clean: true,
  },
  target: 'web',
  devServer: {
    port: '9500',
    static: ['./public'],
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.scss$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|svg|webp)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: pluginsRes,
});

export default config;
