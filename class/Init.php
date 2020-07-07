<?php namespace Ponhiro_Blocks;
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Init
 */
class Init {

	public function __construct() {
		add_action( 'init', [ $this, '_init' ] );
		add_filter( 'block_categories', [ $this, '_block_categories' ] );
		// add_action( 'after_setup_theme', [ $this, '_after_setup_theme' ], 20 );
		add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_scripts' ], 12 );
		add_action( 'admin_enqueue_scripts', [$this, '_admin_enqueue_scripts'] );
		add_action( 'enqueue_block_editor_assets', [ $this, '_enqueue_block_editor_assets' ] );
		if ( ! USFL_BLKS_IS_PRO ) {
			add_filter( 'plugin_action_links_'. USFL_BLKS_BASENAME, [$this, '_plugin_action_links'] );
		}
	}


	/**
	 * カスタムブロック用のスクリプトを追加
	 */
	public function _init() {
		new \Ponhiro_Blocks\Register_Blocks();
	}


	/**
	 * Pro版へのリンクを追加
	 */
	public function _plugin_action_links( $links ) {
		return array_merge( $links, [
			'<a class="pb-link-gopro" target="_blank" href="https://ponhiro.com/useful-blocks/">' . esc_html__( 'Go Pro', USFL_BLKS_DOMAIN ) . '</a>',
		]);
	}


	/**
	 * ブロックカテゴリー追加
	 */
	public function _block_categories( $categories ) {
		
		$my_category = [
			[
				'slug'  => 'useful-blocks',  //ブロックカテゴリーのスラッグ
				'title' => __('Useful Blocks', USFL_BLKS_DOMAIN),   //ブロックカテゴリーの表示名
			]
		];
		return array_merge( $categories, $my_category );
	}


	/**
	 * テーマファイル読み込み後に動かす処理
	 */
	// public function _after_setup_theme() {
	// }


	/**
	 * フロント用ファイルの読み込み
	 */
	public function _wp_enqueue_scripts() {
		
		wp_enqueue_style(
			'ponhiro-blocks-front',
			USFL_BLKS_URL .'dist/css/front.css',
			[],
			USFL_BLKS_VERSION
		);
	}

	/**
	 * フロント用ファイルの読み込み
	 */
	public function _admin_enqueue_scripts() {
		wp_enqueue_style(
			'ponhiro-blocks-admin',
			USFL_BLKS_URL .'dist/css/admin.css',
			[],
			USFL_BLKS_VERSION
		);
	}


	/**
	 * Gutenberg用ファイルの読み込み
	 */
	public function _enqueue_block_editor_assets() {

		wp_enqueue_style(
			'ponhiro-blocks-style',
			USFL_BLKS_URL .'dist/css/blocks.css',
			[],
			USFL_BLKS_VERSION
		);

		$asset = include( USFL_BLKS_PATH. 'dist/blocks/index.asset.php');
		wp_enqueue_script(
			'ponhiro-blocks-script',
			USFL_BLKS_URL .'dist/blocks/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		// JS用翻訳ファイルの読み込み
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations(
				'ponhiro-blocks-script',
				USFL_BLKS_DOMAIN,
				USFL_BLKS_PATH . 'languages'
			);
		}
	}

}