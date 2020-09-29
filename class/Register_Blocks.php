<?php namespace Ponhiro_Blocks;
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * ブロックの登録
 */
class Register_Blocks {
	
	public function __construct() {

		$this->_register_block_type( 'cv-box' );
		$this->_register_block_type( 'cv-box-note' );
		$this->_register_block_type( 'compare-box' );
		$this->_register_block_type( 'iconbox' );
		$this->_register_block_type( 'list' );
		$this->_register_block_type( 'button' );
		$this->_register_block_type( 'image' );
		$this->_register_block_type( 'bar-graph' );
		$this->_register_block_type( 'bar-graph-item' );
	}


	/**
	 * ブロックの登録処理をまとめたやつ
	 */
	public function _register_block_type( $block_name ) {
		$asset = include( USFL_BLKS_PATH. 'dist/blocks/'. $block_name .'/index.asset.php');

		$script_handle = 'ponhiro-blocks/'. $block_name;

		
		// ブロック用スクリプトの登録
		wp_register_script(
			$script_handle,
			USFL_BLKS_URL. 'dist/blocks/'. $block_name .'/index.js',
			array_merge( ['ponhiro-blocks-script'], $asset['dependencies'] ),
			$asset['version'],
			true
		);

		// ブロックの登録
		register_block_type(
			'ponhiro-blicks/'. $block_name,
			[
				// 'editor_style'    => 'ponhiro-blocks-style',
				'editor_script'   => $script_handle,
			]
		);
	}

}
