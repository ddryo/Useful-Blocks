<?php namespace Ponhiro_Blocks;
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Init
 */
class Init {

	public function __construct() {

		// データをセット
		Data::init();

		// 設定ページ
		Admin_Menu::init();

		// フック処理
		add_action( 'init', [ $this, '_init' ] );
		add_filter( 'block_categories', [ $this, 'hook__block_categories' ] );
		// add_action( 'after_setup_theme', [ $this, '_after_setup_theme' ], 20 );
		add_action( 'wp_enqueue_scripts', [ $this, 'hook__wp_enqueue_scripts' ], 12 );
		add_action( 'admin_enqueue_scripts', [$this, 'hook__admin_enqueue_scripts'] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'hook__enqueue_block_editor_assets' ] );
		add_action( 'wp_ajax_pb_reset_settings', [$this, 'pb_reset_settings'] );
		if ( ! USFL_BLKS_IS_PRO ) {
			add_filter( 'plugin_action_links_'. USFL_BLKS_BASENAME, [$this, 'hook__plugin_action_links'] );
		}

		// テーマごとの追加CSS
		add_action( 'wp_head', [ $this, 'add_adjustment_css' ], 20 );
		// add_action( 'admin_head', [$this, 'add_adjustment_css'], 20 );
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
			'<a class="pb-link-gopro" target="_blank" href="https://ponhiro.com/useful-blocks/" style="color: #42ce78;font-weight: 700;">' . esc_html__( 'Go Pro', USFL_BLKS_DOMAIN ) . '</a>',
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
			USFL_BLKS_URL . 'dist/css/front.css',
			[],
			USFL_BLKS_VERSION
		);
		
		// PHPで生成するスタイル
		wp_add_inline_style( 'ponhiro-blocks-front', \Ponhiro_Blocks\Style::output( 'front' ) );
	}

	/**
	 * フロント用ファイルの読み込み
	 */
	public function hook__admin_enqueue_scripts( $hook_suffix ) {

		// 投稿編集画面かどうか
		$is_editor_page = 'post.php' === $hook_suffix || 'post-new.php' === $hook_suffix;

		// 設定ページかどうか
		$is_menu_page = false !== strpos( $hook_suffix, 'useful_blocks' );

		// 編集画面 or 設定ページでのみ読み込む
		if ( $is_editor_page || $is_menu_page ) {

			wp_enqueue_style(
				'ponhiro-blocks-admin',
				USFL_BLKS_URL . 'dist/css/admin.css',
				[],
				USFL_BLKS_VERSION
			);
			wp_add_inline_style( 'ponhiro-blocks-admin', \Ponhiro_Blocks\Style::output( 'editor' ) );
		}

		// 設定ページにだけ読み込むファイル
		if ( $is_menu_page ) {

			// カラーピッカー
			wp_enqueue_style( 'wp-color-picker' );
			wp_enqueue_script( 'wp-color-picker' );

			// メディアアップローダー
			wp_enqueue_media();
			wp_enqueue_script( 'ponhiro-blocks-media', USFL_BLKS_URL . '/dist/js/media.js', ['jquery'], USFL_BLKS_VERSION, true );
		
			// CSS
			wp_enqueue_style(
				'ponhiro-blocks-menu',
				USFL_BLKS_URL . 'dist/css/admin_menu.css',
				[],
				USFL_BLKS_VERSION
			);

			// JS
			wp_enqueue_script(
				'ponhiro-blocks-menu',
				USFL_BLKS_URL . 'dist/js/admin_menu.js',
				['jquery', 'wp-color-picker', 'wp-i18n'],
				USFL_BLKS_VERSION,
				true
			);

			// インラインで出力するグローバル変数
			wp_localize_script( 'ponhiro-blocks-menu', 'pbVars', [
				'ajaxUrl' => admin_url( 'admin-ajax.php' ),
				'ajaxNonce' => wp_create_nonce( 'pb-ajax-nonce' ),
			] );

			// JS用翻訳ファイルの読み込み
			if ( function_exists( 'wp_set_script_translations' ) ) {

				// 翻訳用に空のスクリプトを登録
				wp_enqueue_script(
					'ponhiro-blocks-script',
					USFL_BLKS_URL .'assets/js/empty.js',
					[],
					USFL_BLKS_VERSION,
					true
				);
				
				wp_set_script_translations(
					'ponhiro-blocks-script',
					USFL_BLKS_DOMAIN,
					USFL_BLKS_PATH . 'languages'
				);
			}
		}
	}


	/**
	 * Gutenberg用ファイルの読み込み
	 */
	public function hook__enqueue_block_editor_assets() {

		// スタイル
		wp_enqueue_style(
			'ponhiro-blocks-style',
			USFL_BLKS_URL . 'dist/css/blocks.css',
			[],
			USFL_BLKS_VERSION
		);

		// スクリプト
		wp_enqueue_script(
			'ponhiro-blocks-script',
			USFL_BLKS_URL .'assets/js/empty.js',
			[],
			USFL_BLKS_VERSION,
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


	/**
	 * テーマごとの追加調整
	 */
	public function add_adjustment_css() {
		$css = '';

		// テーマ情報取得
		$theme_data     = wp_get_theme();
		$theme_name     = $theme_data->get( 'Name' );
		$theme_template = $theme_data->get( 'Template' );


		// JINの場合
		if ( 'JIN' === $theme_name || 'jin' === $theme_template ) {
			$css .= '.pb-cv-box, .pb-compare-box, .pb-iconbox, .pb-bar-graph{ margin-top: 0 !important;}';
		}
		if ( $css ) {
			echo '<style id="usfl-blks-adjustment-css">' . $css . '</style>'. PHP_EOL;
		}
	}


	/**
	 * 設定のリセット
	 */
	public function pb_reset_settings() {

		if ( !isset( $_POST['nonce'] ) ) return false;
		$nonce = $_POST['nonce'];
		if ( wp_verify_nonce( $nonce, 'pb-ajax-nonce' ) ) {
			
			delete_option( \Ponhiro_Blocks\Data::DB_NAME['settings'] );
			wp_die( __( 'Succeeded.', USFL_BLKS_DOMAIN ) );
		}

		wp_die( __( 'Failed.', USFL_BLKS_DOMAIN ) );
	}
}
