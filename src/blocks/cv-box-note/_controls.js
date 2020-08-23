/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
// import { withSelect, useSelect, useDispatch } from '@wordpress/data';
import {
	PanelBody,
	BaseControl,
	Button,
	ButtonGroup,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * External dependencies
 */
// import classnames from 'classnames';
import { textDomain, isPro } from '@blocks/config';
import FreePreview from '@blocks/freePreview';

/**
 * Custom Component
 */
export default function (props) {
	const { attributes, setAttributes } = props;
	const { icon, dataStyle } = attributes;

	// 背景スタイル
	const dataStyles = ['border', 'bg'];

	// ボタンの左側に表示するアイコン
	const Icons = [
		{
			val: '',
		},
		{
			val: 'pb-icon-lightbulb',
		},
		{
			val: 'pb-icon-mail',
		},
		{
			val: 'pb-icon-cart',
		},
		{
			val: 'pb-icon-exclamation',
		},
	];
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Style settings', textDomain)}
					initialOpen={true}
				>
					<BaseControl>
						<ButtonGroup className='pb-panel--colorSet'>
							{dataStyles.map((style) => {
								let isSelected = false;
								if (-1 !== dataStyle.indexOf(style)) {
									isSelected = true;
								}
								const buttonId = 'pb-cvnote-style-' + style;
								return (
									<div
										className='__btnBox'
										key={`key_style_${style}`}
									>
										<button
											type='button'
											id={buttonId}
											className='__btn'
											onClick={() => {
												setAttributes({
													dataStyle: style,
												});
											}}
										></button>
										<label
											htmlFor={buttonId}
											className='__label'
											data-selected={isSelected || null}
										>
											<div className='pb-cv-box__notewrap'>
												<span
													className='pb-cv-box__note -preview'
													data-style={style}
												>
													{'border' === style
														? 'Border'
														: 'White'}
												</span>
											</div>
										</label>
									</div>
								);
							})}
						</ButtonGroup>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Icon settings', textDomain)}
					initialOpen={true}
				>
					<BaseControl>
						<FreePreview
							description={__(
								'you can choose from several types of icons.',
								textDomain
							)}
						>
							<ButtonGroup className='pb-btn-group -wide-btns'>
								{Icons.map((_icon) => {
									const iconName = _icon.val;
									const isSelected = iconName === icon;
									return (
										<Button
											// isSecondary
											isPrimary={isSelected}
											key={`pb-cv-note-icon-${iconName}`}
											onClick={() => {
												if (!isPro) return;
												setAttributes({
													icon: iconName,
												});
											}}
										>
											{iconName ? (
												<i className={iconName}></i>
											) : (
												<span>
													{__('None', textDomain)}
												</span>
											)}
										</Button>
									);
								})}
							</ButtonGroup>
						</FreePreview>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
