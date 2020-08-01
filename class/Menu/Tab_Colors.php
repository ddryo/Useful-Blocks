<?php
namespace Ponhiro_Blocks\Menu;
use \Ponhiro_Blocks\Data;
use \Ponhiro_Blocks\Admin_Menu;

if ( ! defined( 'ABSPATH' ) ) exit;

class Tab_Colors {

	/**
	 * カラーパレットの設定
	 */
	public static function color_set( $page_name ) {
		$section_name = 'pb_section_color_set';

		// セクションの追加
		add_settings_section(
			$section_name,
			__( 'Common color set', USFL_BLKS_DOMAIN ),
			function() {
				$desc = '※ : ' . __( 'Color set common to each block.', USFL_BLKS_DOMAIN );
				echo '<div class="__section_description">' . $desc . '</div>';
			},
			$page_name
		);

		add_settings_field(
			'pb_color_set', //フィールドID。何にも使わない
			'', // th
			['\Ponhiro_Blocks\Menu\Tab_Colors', 'callback_for_palette'],
			$page_name,
			$section_name,
			[
				'keys' => [
					'yellow' => __( 'Yellow', USFL_BLKS_DOMAIN ),
					'pink' => __( 'Pink', USFL_BLKS_DOMAIN ),
					'green' => __( 'Green', USFL_BLKS_DOMAIN ),
					'blue' => __( 'Blue', USFL_BLKS_DOMAIN ),
				]
			]
		);
	}


	/**
	 * カラーパレット設定用の専用コールバック
	 */
	public static function callback_for_palette( $args ) {

		$keys = $args['keys'];

		// 使用するデータベース
		$db = Data::DB_NAME['settings'];

		foreach ($keys as $color_name => $label) :
			$key = 'colset_'. $color_name;
			?>
				<div class="__field_title">
					<?=$label?>
				</div>
				<div class="__field -flex -color -pb-color-set">
					<div class="__items">
						<!-- 普通の色 -->
						<div class="__item">
							<span class="__label"><?=_x( 'Base', 'color', USFL_BLKS_DOMAIN )?></span>
							<input type="text" class="pb-colorpicker"
								id="<?=$key?>"
								name="<?=$db .'['. $key .']'?>"
								value="<?=Data::get_settings( $key )?>"
								data-key="<?=$key?>"
								data-default-color="<?=Data::get_default_settings( $key )?>"
							/>
						</div>
						<!-- 薄い色 -->
						<div class="__item">
							<span class="__label"><?=_x( 'Background', 'color', USFL_BLKS_DOMAIN )?></span>
							<input type="text" class="pb-colorpicker"
								id="<?=$key . '_thin'?>"
								name="<?=$db .'['. $key . '_thin]'?>"
								value="<?=Data::get_settings( $key . '_thin' )?>"
								data-key="<?=$key . '_thin'?>"
								data-default-color="<?=Data::get_default_settings( $key . '_thin' )?>"
							/>
						</div>
						<!-- 濃い色 -->
						<div class="__item">
							<span class="__label"><?=_x( 'Shadow', 'color', USFL_BLKS_DOMAIN )?></span>
							<input type="text" class="pb-colorpicker"
								id="<?=$key . '_dark'?>"
								name="<?=$db .'['. $key . '_dark]'?>"
								value="<?=Data::get_settings( $key . '_dark' )?>"
								data-key="<?=$key . '_dark'?>"
								data-default-color="<?=Data::get_default_settings( $key . '_dark' )?>"
							/>
						</div>
					</div>
					<div class="__preview">
						<div class="pb-compare-box" data-colset="<?=substr($color_name, 0, 1)?>">
							<div class="pb-compare-box__head"></div>
							<div class="pb-compare-box__body">
								<div class="pb-cv-box" data-colset="<?=substr($color_name, 0, 1)?>" data-bg="on">
									<div class="pb-cv-box__inner">
										<ul class="pb-list -icon-check"><li>List</li><li>List</li></ul>
										<div class="pb-button">
											<div class="pb-button__btn">
												<span class="pb-button__text">Button</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="__preview_label">Preview</div>
					</div>
				</div>
			<?php
		endforeach;
	}


	/**
	 * CVボックス
	 */
	public static function cv_box( $page_name ) {
		$section_name = 'pb_section_cv_box';

		// セクションの追加
		add_settings_section(
			$section_name,
			__( 'CV Box', USFL_BLKS_DOMAIN ),
			'',
			$page_name
		);

		add_settings_field(
			'pb_cvbox_color',
			'',
			['\Ponhiro_Blocks\Menu\Tab_Colors', 'callback_for_cv_box'],
			$page_name,
			$section_name,
			[
				'class' => 'tr-cv_box',
				'keys' => [
					'1' => 'セット01',
				],
			]
		);
	}


	/**
	 * CVボックス用コールバック
	 */
	public static function callback_for_cv_box( $args ) {

		$keys = $args['keys'];

		// 使用するデータベース
		$db = Data::DB_NAME['settings'];

		foreach ( $keys as $set_num => $label ) :
			?>
				<div class="__field_title">
					<?=$label?>
				</div>
				<div class="__field -flex -color -pb-color-set">
					<div class="__items">
						<?php
							$color_keys = [
								'0' . $set_num . '_bg' => _x( 'Background', 'color', USFL_BLKS_DOMAIN ),
								'0' . $set_num . '_list' => _x( 'Icons', 'color', USFL_BLKS_DOMAIN ),
								'0' . $set_num . '_btn' => _x( 'Button', 'color', USFL_BLKS_DOMAIN ),
								'0' . $set_num . '_shadow' => _x( 'Shadow', 'color', USFL_BLKS_DOMAIN ),
								'0' . $set_num . '_note' => _x( 'Border', 'color', USFL_BLKS_DOMAIN ),
							];
							foreach ($color_keys as $key => $label) :
								$key = 'colset_cvbox_' . $key;
						?>
								<div class="__item">
									<span class="__label"><?=$label?></span>
									<input type="text" class="pb-colorpicker"
										id="<?=$key?>"
										name="<?=$db .'['. $key .']'?>"
										value="<?=Data::get_settings( $key )?>"
										data-key="<?=$key?>"
										data-default-color="<?=Data::get_default_settings( $key )?>"
									/>
								</div>
						<?php
							endforeach;
						?>
					</div>
					<div class="__preview">
						<div class="pb-cv-box" data-colset="<?=$set_num?>" data-bg="on">
							<div class="pb-cv-box__inner">
								<ul class="pb-list -icon-check"><li>List</li><li>List</li></ul>
								<div class="pb-button">
									<div class="pb-button__btn">
										<span class="pb-button__text">Button</span>
									</div>
								</div>
								<div class="pb-cv-box__note" data-style="border"><div class="__text">Text</div></div>
							</div>
						</div>
						<div class="__preview_label">Preview</div>
					</div>
				</div>
			<?php
		endforeach;
	}

	/**
	 * 比較表
	 */
	public static function compare( $page_name ) {
		$section_name = 'pb_section_compare';

		// セクションの追加
		add_settings_section(
			$section_name,
			__( 'Comparison box', USFL_BLKS_DOMAIN ),
			'',
			$page_name
		);

		add_settings_field(
			'pb_compare_color',
			'',
			['\Ponhiro_Blocks\Menu\Tab_Colors', 'callback_for_compare'],
			$page_name,
			$section_name,
			[
				'class' => 'tr-compare',
				'keys' => [
					'1' => 'セット01',
				],
			]
		);
	}


	/**
	 * 比較表用コールバック
	 */
	public static function callback_for_compare( $args ) {

		$keys = $args['keys'];

		// 使用するデータベース
		$db = Data::DB_NAME['settings'];

		foreach ( $keys as $set_num => $label ) :
			?>
				<div class="__field_title">
					<?=$label?>
				</div>
				<div class="__field -flex -color -pb-color-set">
					<div class="__items">
						<?php
							$color_keys = [
								'0' . $set_num . '_l' => __( 'Left', USFL_BLKS_DOMAIN ),
								'0' . $set_num . '_l_bg' => '',
								'0' . $set_num . '_r' => __( 'Right', USFL_BLKS_DOMAIN ),
								'0' . $set_num . '_r_bg' => '',
							];
							foreach ($color_keys as $key => $label) :
								$key = 'colset_compare_' . $key;
						?>
								<div class="__item">
									<span class="__label"><?=$label?></span>
									<input type="text" class="pb-colorpicker"
										id="<?=$key?>"
										name="<?=$db .'['. $key .']'?>"
										value="<?=Data::get_settings( $key )?>"
										data-key="<?=$key?>"
										data-default-color="<?=Data::get_default_settings( $key )?>"
									/>
								</div>
						<?php
							endforeach;
						?>
					</div>
					<div class="__preview">
						<div class="pb-compare-box" data-colset="<?=$set_num?>">
							<div class="pb-compare-box__head">
								<div class="pb-compare-box__head__l">Left</div>
								<div class="pb-compare-box__head__r">Right</div>
							</div>
							<div class="pb-compare-box__body">
								<div class="pb-compare-box__body__l">
									<ul class="pb-list -icon-check"><li>List</li><li>List</li><li>List</li></ul>
								</div>
								<div class="pb-compare-box__body__r">
									<ul class="pb-list -icon-check"><li>List</li><li>List</li><li>List</li></ul>
								</div>
							</div>
						</div>
						<div class="__preview_label">Preview</div>
					</div>
				</div>
			<?php
		endforeach;
	}

}

