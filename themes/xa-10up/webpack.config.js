const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = ( env, options ) => {
	return {
		mode: options.mode,
		entry: [
			path.join( __dirname, 'src', 'js', 'index.js' ),
			path.join( __dirname, 'src', 'styles', 'main.scss' ),
		],
		output: {
			path: path.resolve( __dirname, 'build' ),
			filename: path.join( '.', 'scripts', 'bundle.js' ),
		},
		resolve: {
			extensions: [ '.scss', '.js' ],
			alias: {
				shared: path.join( __dirname, 'src', 'styles', 'shared' ),
				node: path.join( __dirname, 'node_modules' ),
			},
		},
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: ExtractTextPlugin.extract( {
						fallback: 'style-loader',
						use: [
							'css-loader',
							{
								loader: 'sass-loader',
								options: {
									implementation: require( 'sass' ),
									sourceMap: true,
								},
							},
						],
					} ),
				},
			],
		},
		optimization: {
			minimize: options.mode === 'production',
			minimizer:
				options.mode === 'production'
					? [
							new OptimizeCSSAssetsPlugin( {} ),
							new TerserPlugin( {
								sourceMap: false, // Must be set to true if using source-maps in production
								terserOptions: {
									compress: {
										drop_console: true,
									},
								},
							} ),
					  ]
					: [],
		},
		plugins: [
			new ExtractTextPlugin( path.join( '.', 'styles', 'style.css' ) ),
			// new ExtractTextPlugin(path.join('..', '..', 'editor-style.css'))
		],
		externals: {
			jquery: 'jQuery',
			normalize: 'normalize',
		},
	};
};
