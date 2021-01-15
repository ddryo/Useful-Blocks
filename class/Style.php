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
	 * カスタムスタイルの生成（フロント用）
	 * @return void
	 */
	public static function front_style() {
		// $settings = Data::get_settings();
	}


	/**
	 * カスタムスタイル（フロント&エディター共通用）
	 * @return void
	 */
	public static function post_style() {

		$settings = Data::get_settings();

		$root_colors = [
			'colset_yellow',
			'colset_yellow_thin',
			'colset_yellow_dark',
			'colset_pink',
			'colset_pink_thin',
			'colset_pink_dark',
			'colset_green',
			'colset_green_thin',
			'colset_green_dark',
			'colset_blue',
			'colset_blue_thin',
			'colset_blue_dark',

			'colset_cvbox_01_bg',
			'colset_cvbox_01_list',
			'colset_cvbox_01_btn',
			'colset_cvbox_01_shadow',
			'colset_cvbox_01_note',

			'colset_compare_01_l',
			'colset_compare_01_l_bg',
			'colset_compare_01_r',
			'colset_compare_01_r_bg',

			'colset_iconbox_01',
			'colset_iconbox_01_bg',
			'colset_iconbox_01_icon',

			'colset_bargraph_01',
			'colset_bargraph_01_bg',
			'colset_bar_01',
			'colset_bar_02',
			'colset_bar_03',
			'colset_bar_04',
		];

		foreach ( $root_colors as $key ) {
			self::add_root( '--pb_' . $key, $settings[$key] );
		}

		// アイコン画像
		$icon_sets = [ '01', '02', '03', '04' ];
		foreach ( $icon_sets as $key ) {
			$img_url = $settings[ 'iconbox_img_'. $key ] ?: USFL_BLKS_URL . 'assets/img/a_person.png';
			self::add(
				'.pb-iconbox__figure[data-iconset="'. $key . '"]',
				'background-image: url(' . $img_url .')'
			);
		}

		// 評価グラフ
		$color_sets = [ 'yellow', 'pink', 'green', 'blue' ];
		foreach ( $color_sets as $key ) {
			$bar_color = self::get_rgba( $settings['colset_' . $key . '_thin'], 1, -.06 );
			// self::add(
			// 	'.pb-rating-graph[data-colset="'. substr( $key, 0, 1 ) . '"]',
			// 	'--pb-rating-color_bar: ' . $bar_color
			// );
		}
		
	}


	/**
	 * 生成したCSSの出力
	 */
	public static function output( $type = 'front' ) {

		// スタイルを生成
		if ( 'front' === $type ) {

			self::post_style();
			// self::front_style(); // 今は特にない

		} elseif ( 'editor' === $type ) {

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


	/**
	 * カラーコードをrgbaに変換
	 * $brightness : -1 ~ 1
	 */
	public static function get_rgba( $color_code, $alpha = 1, $brightness = 0 ) {

		$color_code = str_replace( '#', '', $color_code );

		$rgba_code          = [];
		$rgba_code['red']   = hexdec( substr( $color_code, 0, 2 ) );
		$rgba_code['green'] = hexdec( substr( $color_code, 2, 2 ) );
		$rgba_code['blue']  = hexdec( substr( $color_code, 4, 2 ) );

		if ( $brightness !== 0 ) {
			foreach ( $rgba_code as $key => $val ) {
				$val               = (int) $val;
				$result            = $val + ( $val * $brightness );
				$rgba_code[ $key ] = max( 0, min( 255, round( $result ) ) );
			}
		}

		$rgba_code['alpha'] = $alpha;

		return 'rgba(' . implode( ', ', $rgba_code ) . ' )';

	}

}