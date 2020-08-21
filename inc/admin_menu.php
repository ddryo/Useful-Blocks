<?php 
use \Ponhiro_Blocks\Admin_Menu;
if ( ! defined( 'ABSPATH' ) ) exit;

$menu_tabs = Admin_Menu::$menu_tabs;

// 翻訳用
$green_message = __('Your settings have been saved.', USFL_BLKS_DOMAIN );

?>
<div class="usfl_blks_page -is-free" data-lang=<?=_x( 'en', 'lang_slug', USFL_BLKS_DOMAIN )?>>
	<div class="usfl_blks_page__head">
		<div class="usfl_blks_page__inner">
			<h1 class="usfl_blks_page__title">
				<a href="https://ponhiro.com/useful-blocks/" target="_blank">
					<img src="<?=USFL_BLKS_URL . 'assets/img/ub_logo.png'?>" alt="Useful Blocks">
				</a>
				<a href="https://ponhiro.com/useful-blocks/" target="_blank" class="usfl_blks_page__gopro">
					<i class="pb-icon-chevron-circle-right"></i><span>Go Pro</span>
				</a>
			</h1>
			<div class="usfl_blks_page__tabs">
				<div class="nav-tab-wrapper">
					<?php 
						foreach ( $menu_tabs as $key => $val ) :
							$nav_class = ( $val === reset( $menu_tabs ) ) ? 'nav-tab act_' : 'nav-tab';
							echo '<a href="#' . $key . '" class="' . $nav_class . '">' . 
								$val . ' <span>(DEMO)</span>'.
							'</a>';
						endforeach;
					?>
				</div>
			</div>
		</div>
	</div>
	<div class="usfl_blks_page__body">
		<div class="usfl_blks_page__inner">
				<div class="usfl_blks_page__free_message">
					<i class="pb-icon-lightbulb"></i>
					<?php 
						echo sprintf(
							__( 'Only the %s can actually save the settings.', USFL_BLKS_DOMAIN ), 
							'<a href="https://ponhiro.com/useful-blocks/" target="_blank">'. __( 'Pro version', USFL_BLKS_DOMAIN ).'</a>'
						);
						echo '<br>';
						echo __( 'In the free version, you can check the usability of the setting page.', USFL_BLKS_DOMAIN );
					?>
				</div>
			<?php
				foreach ( $menu_tabs as $key => $val ) :

					$tab_class = ( $val === reset( $menu_tabs ) ) ? "tab-contents act_" : "tab-contents";
					echo '<div id="' . $key . '" class="' . $tab_class . '">';

						//タブコンテンツの読み込み（専用のファイルが有れば優先）
						if ( file_exists( USFL_BLKS_PATH . 'inc/admin_menu/'. $key . '.php' ) ) {

							include_once USFL_BLKS_PATH . 'inc/admin_menu/'. $key . '.php';

						} else {

							// ファイルなければ単純に do_settings_sections
							do_settings_sections( Admin_Menu::PAGE_NAMES[$key] );
						}

					echo '</div>';
				endforeach;
				
				settings_fields( 'usfl_blks_setting_group' ); //settings_fieldsがnonceなどを出力するだけ
			?>
		</div>
	</div>

	<div class="usfl_blks_page__adarea">
		<!-- <div class="__ad_item -ponhiro">
			<a href="###">
				<img src="<?=USFL_BLKS_URL?>assets/img/ponhiro_blog_banner.jpg" alt="SWELL">
			</a>
			<span>ぽんひろ.com</span>
		</div> -->
		<div class="__ad_item -swell">
			<a href="https://swell-theme.com/" target="_blank">
				<img src="<?=USFL_BLKS_URL?>assets/img/swell2_pr_banner.jpg" alt="SWELL">
			</a>
			<span>WordPressテーマ SWELL</span>
		</div>
	</div>

</div>


