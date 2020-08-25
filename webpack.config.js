const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const glob = require( 'glob' );

// ブロック自動取得
const entries = {};
const srcDir = './src/blocks';
glob.sync( '**/index.js', {
	// ignore: '**/_*.js',
	cwd: srcDir,
} ).map( ( key ) => {
	entries[ key ] = path.resolve( srcDir, key );
} );

module.exports = {
	...defaultConfig, //@wordpress/scriptを引き継ぐ

	mode: 'production', // npm start でも圧縮させる

	//エントリーポイント
	entry: entries,

	//アウトプット先
	output: {
		path: path.resolve( __dirname, 'dist/blocks' ),
		filename: '[name]',
	},

	resolve: {
		alias: {
			'@blocks': path.resolve( __dirname, 'src/blocks/' ),
		},
	},
};
