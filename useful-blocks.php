<?php
/**
 * Plugin Name: Useful Blocks
 * Plugin URI: https://ponhiro.com/useful-blocks/
 * Description: It is a plugin that collects very convenient blocks.
 * Version: 1.0.4
 * Author: Ponhiro, Ryo
 * Author URI: https://ponhiro.com/useful-blocks/
 * License: GPL2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: useful-blocks
 * Domain Path: /languages
 */
if ( ! defined( 'ABSPATH' ) ) exit;

// register_block_typeが未定義のバージョンではプラグインを読み込まない
if ( ! function_exists( 'register_block_type' ) ) return;

/**
 * バージョン情報
 */
define( 'USFL_BLKS_VERSION', ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ? date('mdGis') : '1.0.4');

/**
 * 翻訳用のテキストドメインを定義
 */
define( 'USFL_BLKS_DOMAIN', 'useful-blocks' );

/**
 * 定数宣言
 */
define( 'USFL_BLKS_URL', plugins_url( '/', __FILE__ ) );
define( 'USFL_BLKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'USFL_BLKS_BASENAME', plugin_basename( __FILE__ ) );

/**
 * 翻訳ファイルを登録 ( 自前の翻訳ファイルを読み込む )
 */
load_textdomain( USFL_BLKS_DOMAIN, USFL_BLKS_PATH . 'languages/useful-blocks-ja.mo');

/**
 * Autoload
 */
require_once( __DIR__ . '/vendor/autoload.php' );

/**
 * プラグイン Init
 */
add_action( 'plugins_loaded', function() {
	if ( ! defined('USFL_BLKS_IS_PRO') ) define( 'USFL_BLKS_IS_PRO', false );
	new Ponhiro_Blocks\Init();
});
