<?php
namespace Ponhiro_Blocks;

use \Ponhiro_Blocks\Menu as Menu;

if ( ! defined( 'ABSPATH' ) ) exit;

class Admin_Menu {

	// 後方互換維持用
	const PAGE_NAMES = [
		'colors' => 'usfl_blks_colors',
		'icons'  => 'usfl_blks_iconss',
		'reset'  => 'usfl_blks_reset',
	];

	// 後方互換維持用
	public static $menu_tabs = [];


	/**
	 * メディアアップローダー
	 */
	public static function mediabtn( $id, $src = '', $db = '' ) {
		$name = $db ? $db . '['. $id . ']' : $id;
	?>
		<input type="hidden" id="src_<?=esc_attr( $id )?>" name="<?=esc_attr( $name )?>" value="<?=esc_attr( $src )?>" />
		<div id="preview_<?=esc_attr( $id )?>" class="pb-mediaPreview">
			<?php if ( $src ) : ?>
				<img src="<?=esc_url( $src )?>" alt="preview" style="max-width:100%;">
			<?php endif; ?>
		</div>
		<div class="pb-mediaBtns">
			<input class="button" type="button" name="pb-media-upload" data-id="<?=esc_attr( $id )?>" value="<?=__( 'Select image', 'useful-blocks' )?>" />
			<input class="button" type="button" name="pb-media-clear" value="<?=__( 'Delete image', 'useful-blocks' )?>" data-id="<?=esc_attr( $id )?>" />
		</div>
	<?php
	}

}
