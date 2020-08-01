<?php 
use \Ponhiro_Blocks\Admin_Menu;
if ( ! defined( 'ABSPATH' ) ) exit;

$menu_tabs = [
	'colors' => __( 'Color set', 'useful-blocks' ),
	'reset'  => __( 'Reset', 'useful-blocks' ),
];
//メッセージ用
$green_message = '';
if( isset( $_REQUEST['settings-updated'] ) && $_REQUEST['settings-updated'] ) {
	// Settings API は $_REQUEST でデータが渡ってくる

	$green_message = __('Your settings have been saved.', USFL_BLKS_DOMAIN ); //設定を保存しました。
}

?>
<div class="usfl_blks_page" data-lang=<?=_x( 'en', 'lang_slug', USFL_BLKS_DOMAIN )?>>
	<div class="usfl_blks_page__head">
		<div class="usfl_blks_page__inner">
			<h1 class="usfl_blks_page__title">
				<a href="https://ponhiro.com/useful-blocks/" title="Useful Blocks">
					<img src="<?=USFL_BLKS_URL . 'assets/img/logo.png'?>" alt="Useful Blocks">
				</a>
			</h1>
			<div class="usfl_blks_page__tabs">
				<div class="nav-tab-wrapper">
					<?php 
						foreach ( $menu_tabs as $key => $val ) :
							$nav_class = ( $val === reset( $menu_tabs ) ) ? 'nav-tab act_' : 'nav-tab';
							echo '<a href="#' . $key . '" class="' . $nav_class . '">' . $val . '</a>';
						endforeach;
					?>
				</div>
			</div>
		</div>
	</div>
	<div class="usfl_blks_page__body">
		<?php 
			if ( $green_message ) :
				echo '<div class="notice updated is-dismissible"><p>'. $green_message .'</p></div>';
			endif;
		?>
		<div class="usfl_blks_page__inner">
			<form method="POST" action="options.php">
			<?php
				foreach ( $menu_tabs as $key => $val ) :

					$tab_class = ( $val === reset( $menu_tabs ) ) ? "tab-contents act_" : "tab-contents";
					echo '<div id="' . $key . '" class="' . $tab_class . '">';

						//タブコンテンツの読み込み（専用のファイルが有れば優先）
						if ( file_exists( USFL_BLKS_PATH.'inc/admin_menu/'. $key . '.php' ) ) {

							include_once USFL_BLKS_PATH.'inc/admin_menu/'. $key . '.php';

						} else {

							// ファイルなければ単純に do_settings_sections
							do_settings_sections( Admin_Menu::PAGE_NAMES[$key] );
							submit_button( '', 'primary large', 'submit_' . $key );

						}

					echo '</div>';
				endforeach;
				
				settings_fields( 'usfl_blks_setting_group' ); //settings_fieldsがnonceなどを出力するだけ
			?>
			</form>
		</div>
	</div>
</div>
