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
		'icons'  => 'usfl_blks_iconss',
		'reset'   => 'usfl_blks_reset',
	];

	// メニューのタブ
	public static  $menu_tabs = [];

	// 外部からインスタンス化させない
	private function __construct() {}


	/**
	 * init
	 */
	public static function init() {

		if ( isset( self::$instance ) ) return;
		self::$instance = new Admin_Menu();

		self::$menu_tabs = [
			'colors' => __( 'Color set', 'useful-blocks' ),
			'icons' => __( 'Icon image', 'useful-blocks' ),
			'reset'  => __( 'Reset', 'useful-blocks' ),
		];

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

				if ( USFL_BLKS_IS_PRO ) {
					do_action( 'usefl_blks_admin_menu' );
				} else {
					require_once USFL_BLKS_PATH . 'inc/admin_menu.php';
				}
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
		Menu\Tab_Colors::iconbox( self::PAGE_NAMES['colors'] );
		Menu\Tab_Colors::bar_graph( self::PAGE_NAMES['colors'] );
		Menu\Tab_Icons::iconbox( self::PAGE_NAMES['icons'] );

	}

	/**
	 * メディアアップローダー
	 */
	public static function mediabtn( $id = '', $src = '', $db = '' ) {
		$name = $db ? $db . '['. $id . ']' : $id;
	?>
		<input type="hidden" id="src_<?=$id?>" name="<?=$name?>" value="<?=esc_attr( $src )?>" />
		<div id="preview_<?=$id?>" class="pb-mediaPreview">
			<?php if ( $src ) : ?>
				<img src="<?=esc_url( $src )?>" alt="preview" style="max-width:100%;">
			<?php endif; ?>
		</div>
		<div class="pb-mediaBtns">
			<input class="button" type="button" name="pb-media-upload" data-id="<?=$id?>" value="<?=__( 'Select image', 'useful-blocks' )?>" />
			<input class="button" type="button" name="pb-media-clear" value="<?=__( 'Delete image', 'useful-blocks' )?>" data-id="<?=$id?>" />
		</div>
	<?php
	}

}
