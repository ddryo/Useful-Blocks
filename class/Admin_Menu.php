<?php
namespace Ponhiro_Blocks;

use \Ponhiro_Blocks\Data;
use \Ponhiro_Blocks\Menu as Menu;

if ( ! defined( 'ABSPATH' ) ) exit;

class Admin_Menu {

	/**
	 * インスタンス
	 */
	private static $instance;

	// ページスラッグ
	const PAGE_SLUG  = 'useful_blocks';

	// settings_field() と settings_section() で使う $page
	const PAGE_NAMES = [
		// basic
		'colors'  => 'usfl_blks_colors',
		'reset'   => 'usfl_blks_reset',
	];

	// 外部からインスタンス化させない
	private function __construct() {}


	/**
	 * init
	 */
	public static function init() {

		if ( isset( self::$instance ) ) return;
		self::$instance = new Admin_Menu();

		add_action( 'admin_menu', [ self::$instance, 'hook__admin_menu' ] );
		add_action( 'admin_init', [ self::$instance, 'hook__admin_init' ] );
	}


	/**
	 * 管理画面に独自メニューを追加
	 */
	public function hook__admin_menu() {

		add_menu_page(
			__( 'Useful Blocks', USFL_BLKS_DOMAIN ), // ページタイトルタグ
			__( 'Useful Blocks', USFL_BLKS_DOMAIN ), // メニュータイトル
			'manage_options', // 必要な権限
			self::PAGE_SLUG, // このメニューを参照するスラッグ名
			function () {
				global $is_IE;
				if ( $is_IE ) {
					echo '<div style="padding:2em;font-size:2em;">※ IE以外のブラウザをお使いください。</div>';
					return;
				}
				require_once USFL_BLKS_PATH . 'inc/admin_menu.php';
			},
			'dashicons-screenoptions', // アイコン
			30 // 管理画面での表示位置
		);
	}


	/**
	 * 設定の追加
	 */
	public function hook__admin_init() {

		// 同じオプションに配列で値を保存するので、register_setting() は１つだけ
		register_setting( 'usfl_blks_setting_group', Data::DB_NAME['settings'] );

		Menu\Tab_Colors::color_set( self::PAGE_NAMES['colors'] );
		Menu\Tab_Colors::cv_box( self::PAGE_NAMES['colors'] );
		Menu\Tab_Colors::compare( self::PAGE_NAMES['colors'] );

	}

}
