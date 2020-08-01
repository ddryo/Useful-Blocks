<?php
namespace Ponhiro_Blocks;

if ( ! defined( 'ABSPATH' ) ) exit;

class Style {

	/**
	 * CSS変数をまとめておく
	 */
	public static $root_styles = '';

	/**
	 * 最終的に吐き出すCSS
	 */
	public static $styles = [
		'all' => '',
		'pc' => '',
		'sp' => '',
		'tab' => '',
		'mobile' => '',
	];

	/**
	 * 
	 */
	public static $modules = [];

	/**
	 * 外部からのインタンス呼び出し無効
	 */
	private function __construct() {}


	/**
	 * :rootスタイル生成
	 */
	public static function add_root( $name, $val ) {
		self::$root_styles .= $name . ':' . $val. ';';
	}


	/**
	 * スタイル生成
	 */
	public static function add( $selectors, $properties, $media_query = 'all', $branch = '' ) {

		if ( empty( $properties ) ) return;

		if ( is_array( $selectors ) ) {
			$selectors = implode( ',', $selectors );
		}

		if ( is_array( $properties ) ) {
			$properties = implode( ';', $properties );
		}

		if ( $branch === 'editor' ) {
			if ( ! is_admin() ) return;
		} elseif( $branch === 'front' ) {
			if ( is_admin() ) return;
		}

		self::$styles[$media_query] .= $selectors .'{'. $properties .'}';
	}



	/**
	 * パーツ化したCSSファイルの読み込み
	 */
	public static function add_module( $filename = '' ) {

		self::$modules[] = $filename;

	}


	/**
	 * カスタムスタイルの生成（フロント用）
	 * @return void
	 */
	public static function custom_style() {
		$SETTING = Data::get_settings();

		// カラーのセット
		// Style\Color::front( $SETTING );
	}


	/**
	 * カスタムスタイル（フロント&エディター共通用）
	 * @return void
	 */
	public static function post_style() {

		$settings = Data::get_settings();

		self::add_root( '--pb_colset_yellow', $settings['colset_yellow'] );
		self::add_root( '--pb_colset_yellow_thin', $settings['colset_yellow_thin'] );
		self::add_root( '--pb_colset_yellow_dark', $settings['colset_yellow_dark'] );
		self::add_root( '--pb_colset_pink', $settings['colset_pink'] );
		self::add_root( '--pb_colset_pink_thin', $settings['colset_pink_thin'] );
		self::add_root( '--pb_colset_pink_dark', $settings['colset_pink_dark'] );
		self::add_root( '--pb_colset_green', $settings['colset_green'] );
		self::add_root( '--pb_colset_green_thin', $settings['colset_green_thin'] );
		self::add_root( '--pb_colset_green_dark', $settings['colset_green_dark'] );
		self::add_root( '--pb_colset_blue', $settings['colset_blue'] );
		self::add_root( '--pb_colset_blue_thin', $settings['colset_blue_thin'] );
		self::add_root( '--pb_colset_blue_dark', $settings['colset_blue_dark'] );

	}


	/**
	 * 生成したCSSの出力
	 */
	public static function output( $type = 'front' ) {

		// スタイルを生成
		if ( $type === 'front' ) {
			self::post_style();
			self::custom_style();
		} elseif ( $type === 'editor' ) {
			self::post_style();
		}
		

		$output_css = '';
		if ( ! empty( self::$root_styles ) ) $output_css .= ':root{'. self::$root_styles .'}';

		$styles = self::$styles;
		
		if ( ! empty( $styles['all'] ) ) $output_css .= $styles['all'];
		if ( ! empty( $styles['pc'] ) ) $output_css .= '@media screen and (min-width: 960px){'. $styles['pc'] .'}';
		if ( ! empty( $styles['sp'] ) ) $output_css .= '@media screen and (max-width: 959px){'. $styles['sp'] .'}';
		if ( ! empty( $styles['tab'] ) ) $output_css .= '@media screen and (min-width: 600px){'. $styles['tab'] .'}';
		if ( ! empty( $styles['mobile'] ) ) $output_css .= '@media screen and (max-width: 599px){'. $styles['mobile'] .'}';

		return $output_css;
	}

}