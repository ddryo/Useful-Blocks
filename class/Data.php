<?php
namespace Ponhiro_Blocks;
if ( ! defined( 'ABSPATH' ) ) exit;

class Data {

	/**
	 * インスタンス
	 */
	private static $instance;

	/**
	 * 設定値
	 */
	protected static $settings = '';
	protected static $default_settings = '';

	/**
	 * DB名
	 */
	const DB_NAME = [
		'settings' => 'useful_blocks_settings'
	];


	/**
	 * 外部からインスタンス化させない
	 */
	private function __construct() {}


	/**
	 * インスタンスを取得または生成して返す
	 */
	public static function get_instance() {
		if ( empty( self::$instance ) ) {
			self::$instance = new Data();
		}
		return self::$instance;
	}


	/**
	 * init
	 */
	public static function init() {

		// 一度しか発火させない
		if ( isset( self::$instance ) ) return;
		self::$instance = self::get_instance();

		// デフォルト値のセット
		self::$instance->set_default();

		// 設定をDBから取得してメンバー変数に保持
		add_action( 'init', [ self::$instance, 'set_settings' ], 10 );
	}


	/**
	 * デフォルト値をセット
	 */
	private function set_default() {

		/**
		 * 設定データ
		 */
		self::$default_settings = [

			// イエロー
			'colset_yellow' => '#fdc44f',
			'colset_yellow_thin' => '#fef9ed',
			'colset_yellow_dark' => '#b4923a',

			// ピンク
			'colset_pink' => '#fd9392',
			'colset_pink_thin' => '#ffefef',
			'colset_pink_dark' => '#d07373',

			// 緑
			'colset_green' => '#91c13e',
			'colset_green_thin' => '#f2f8e8',
			'colset_green_dark' => '#61841f',

			// 青
			'colset_blue' => '#6fc7e1',
			'colset_blue_thin' => '#f0f9fc',
			'colset_blue_dark' => '#419eb9',


			// CVボックス
			'colset_cvbox_01_bg' => '#f5f5f5',
			'colset_cvbox_01_list' => '#3190b7',
			'colset_cvbox_01_btn' => '#91c13e',
			'colset_cvbox_01_shadow' => '#628328',
			'colset_cvbox_01_note' => '#fdc44f',

			// 比較小
			'colset_compare_01_l' => '#6fc7e1',
			'colset_compare_01_l_bg' => '#f0f9fc',
			'colset_compare_01_r' => '#ffa883',
			'colset_compare_01_r_bg' => '#fff6f2',

			// アイコンボックス
			'colset_iconbox_01' => '#6e828a',
			'colset_iconbox_01_bg' => '#fff',
			'colset_iconbox_01_icon' => '#ee8f81',
			'iconbox_img_01' => '',
			'iconbox_img_02' => '',
			'iconbox_img_03' => '',
			'iconbox_img_04' => '',

			// 棒グラフ
			'colset_bargraph_01' => '#9dd9dd',
			'colset_bargraph_01_bg' => '#fafafa',
			'colset_bar_01' => '#f8db92',
			'colset_bar_02' => '#fda9a8',
			'colset_bar_03' => '#bdda8b',
			'colset_bar_04' => '#a1c6f1',
		];
	}


	/**
	 * 設定値を取得してメンバー変数にセット
	 */
	public function set_settings() {
		$settings = get_option( self::DB_NAME['settings'] ) ?: [];
		self::$settings = array_merge( self::$default_settings, $settings );
	}

	/**
	 * デフォルト値を取得
	 */
	public static function get_default_settings( $key = null ) {

		if ( null !== $key ) {
			return self::$default_settings[$key];
		}
		return self::$default_settings;

	}

	/**
	 * 設定値の取得用メソッド
	 * キーが指定されていればそれを、指定がなければ全てを返す。
	 */
	public static function get_settings( $key = null ) {
		if ( null !== $key ) {
			return self::$settings[ $key ] ?: '';
		}
		return self::$settings;
	}

}
