<?php namespace Ponhiro_Blocks;
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Init
 */
class Init {

	public function __construct() {

		// データをセット
		Data::init();

		// フック処理
		add_action( 'init', [ $this, '_init' ] );
		add_filter( 'block_categories', [ $this, 'hook__block_categories' ] );
		// add_action( 'after_setup_theme', [ $this, '_after_setup_theme' ], 20 );
		add_action( 'wp_enqueue_scripts', [ $this, 'hook__wp_enqueue_scripts' ], 12 );
		add_action( 'admin_enqueue_scripts', [$this, 'hook__admin_enqueue_scripts'] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'hook__enqueue_block_editor_assets' ] );
		if ( ! USFL_BLKS_IS_PRO ) {
			add_filter( 'plugin_action_links_'. USFL_BLKS_BASENAME, [$this, 'hook__plugin_action_links'] );
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
	public function hook__plugin_action_links( $links ) {
		return array_merge( $links, [
			'<a class="pb-link-gopro" target="_blank" href="https://ponhiro.com/useful-blocks/">' . esc_html__( 'Go Pro', USFL_BLKS_DOMAIN ) . '</a>',
		]);
	}


	/**
	 * ブロックカテゴリー追加
	 */
	public function hook__block_categories( $categories ) {
		
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
	public function hook__wp_enqueue_scripts() {
		
		wp_enqueue_style(
			'ponhiro-blocks-front',
			USFL_BLKS_URL .'dist/css/front.css',
			[],
			USFL_BLKS_VERSION
		);
		
		// PHPで生成するスタイル
		$inline_style = \Ponhiro_Blocks\Style::output( 'front' );
		wp_add_inline_style( 'ponhiro-blocks-front', $inline_style );
	}

	/**
	 * フロント用ファイルの読み込み
	 */
	public function hook__admin_enqueue_scripts( $hook_suffix ) {

		// 編集画面かどうか
		$is_editor_page = 'post.php' === $hook_suffix || 'post-new.php' === $hook_suffix;

		// 編集画面 or Useful Blocks 設定ページでのみ読み込む
		if ( $is_editor_page || strpos( $hook_suffix, 'swell_settings' ) !== false ) {

			wp_enqueue_style(
				'ponhiro-blocks-admin',
				USFL_BLKS_URL .'dist/css/admin.css',
				[],
				USFL_BLKS_VERSION
			);

			$inline_style = \Ponhiro_Blocks\Style::output( 'editor' );
			wp_add_inline_style( 'ponhiro-blocks-admin', $inline_style );
		}
	}


	/**
	 * Gutenberg用ファイルの読み込み
	 */
	public function hook__enqueue_block_editor_assets() {

		// スタイル
		wp_enqueue_style(
			'ponhiro-blocks-style',
			USFL_BLKS_URL .'dist/css/blocks.css',
			[],
			USFL_BLKS_VERSION
		);

		// スクリプト
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