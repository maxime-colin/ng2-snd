// @AngularClass

var webpack = require('webpack');
var helpers = require('./helpers');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HMR = process.argv.join('').indexOf('hot') > -1;

var metadata = {
  title: 'NG2 - Soundboard.top',
  baseUrl: '/',
  host: '192.168.1.11',
  port: 3000,
  ENV: ENV,
  HMR: HMR
};
/*
 * Config
 */
module.exports = helpers.validate({
  // static data for index.html
  metadata: metadata,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,
  // cache: false,

  // our angular app
  entry: { 'polyfills': './src/polyfills.ts', 'main': './src/main.ts' },

  // Config for our build files
  output: {
	path: helpers.root('dist'),
	filename: '[name].bundle.js',
	sourceMapFilename: '[name].map',
	chunkFilename: '[id].chunk.js'
  },

  resolve: {
	extensions: ['', '.ts', '.async.ts', '.js', '.less']
  },

  module: {
	preLoaders: [
	  { test: /\.js$/, loader: "source-map-loader", exclude: [ helpers.root('node_modules/rxjs') ] }
	],
	loaders: [
	  // Support for .ts files.
	  { test: /\.ts$/, loader: 'ts-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] },

	  // Support for *.json files.
	  { test: /\.json$/,  loader: 'json-loader' },

	  // Support for CSS as raw text
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },

	  // support for .html as raw text
	  { test: /\.html$/,  loader: 'raw-loader', exclude: [ helpers.root('src/index.html') ] }

	]
  },

  plugins: [
	new webpack.optimize.OccurenceOrderPlugin(true),
	new webpack.optimize.CommonsChunkPlugin({ name: 'polyfills', filename: 'polyfills.bundle.js', minChunks: Infinity }),
	// static assets
	new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]),
	new CopyWebpackPlugin([ { from: 'src/CNAME', to: 'dist'} ]),
	// generating html
	new HtmlWebpackPlugin({ template: 'src/index.html' }),
	// replace
	new webpack.DefinePlugin({
	  'process.env': {
		'ENV': JSON.stringify(metadata.ENV),
		'NODE_ENV': JSON.stringify(metadata.ENV),
		'HMR': HMR
	  }
	}),
  ],

  // Other module loader config
  tslint: {
	emitErrors: false,
	failOnHint: false,
	resourcePath: 'src',
  },

  // our Webpack Development Server config
  devServer: {
	port: metadata.port,
	host: metadata.host,
	// contentBase: 'src/',
	historyApiFallback: true,
	watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },
  // we need this due to problems with es6-shim
  node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
});
