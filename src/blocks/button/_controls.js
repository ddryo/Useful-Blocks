/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
// import { link as linkIcon } from '@wordpress/icons';
import {
	// RichText,
	// InnerBlocks,
	InspectorControls,
	BlockControls,
	// BlockIcon,
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	ToggleControl,
	BaseControl,
	Button,
	ButtonGroup,
	// Tooltip,
	TextareaControl,
	ToolbarButton,
	ToolbarGroup,
	Popover,
} from '@wordpress/components';

/**
 * External dependencies
 */
// import classnames from 'classnames';
import { textDomain, isPro } from '@blocks/config';
// import pbIcon from '@blocks/icon';
import FreePreview from '@blocks/freePreview';

export default function (props) {
	const { attributes, setAttributes, siblingsImageId } = props;
	const {
		btnEm,
		linkLabel,
		linkUrl,
		url,
		arrowIcon,
		emIcon,
		isShowLink,
		isRound,
		isNewTab,
		rel,
		imgTag,
	} = attributes;
	const { updateBlockAttributes } = useDispatch('core/block-editor');

	// state
	const [isURLPickerOpen, setIsURLPickerOpen] = useState(false);

	// ボタンの左側に表示するアイコン
	const emIcons = [
		{
			val: 'pb-icon-arrow-down',
		},
		{
			val: 'pb-icon-mail',
		},
		{
			val: 'pb-icon-cart',
		},
	];

	// ボタンの右側に表示するアイコン
	const arrowIcons = [
		{
			val: '',
		},
		{
			val: 'pb-icon-chevron-right',
		},
		{
			val: 'pb-icon-chevron-circle-right',
		},
	];

	const emIconButtons = (
		<ButtonGroup className='pb-btn-group -wide-btns'>
			{emIcons.map((icon) => {
				const iconName = icon.val;
				const isSelected = iconName === emIcon;
				return (
					<Button
						// isSecondary
						isPrimary={isSelected}
						key={`pb-em-icon-${iconName}`}
						onClick={() => {
							if (!isPro) return;
							setAttributes({
								emIcon: iconName,
							});
						}}
					>
						<i className={iconName}></i>
					</Button>
				);
			})}
		</ButtonGroup>
	);

	const arrowIconButtons = (
		<ButtonGroup className='pb-btn-group -wide-btns'>
			{arrowIcons.map((icon) => {
				const iconName = icon.val;
				const isSelected = iconName === arrowIcon;
				return (
					<Button
						// isSecondary
						isPrimary={isSelected}
						key={`pb-arrow-icon-${iconName}`}
						onClick={() => {
							if (!isPro) return;
							setAttributes({
								arrowIcon: iconName,
							});
						}}
					>
						{iconName ? (
							<i className={iconName}></i>
						) : (
							<span>なし</span>
						)}
					</Button>
				);
			})}
		</ButtonGroup>
	);

	const linkControls = (
		<>
			<TextControl
				label={__('URL')}
				type='url'
				value={url}
				onChange={(val) => {
					setAttributes({ url: val });

					// 画像ブロックにも反映
					if (siblingsImageId) {
						updateBlockAttributes(siblingsImageId, { href: val });
					}
				}}
			/>
			<ToggleControl
				label={__('Open in new tab')}
				checked={isNewTab}
				onChange={(value) => {
					let newRel = rel || '';
					if (value) {
						// noopener / noreferrerがなければつける
						if (-1 === newRel.indexOf('noopener')) {
							newRel += ' noopener';
						}
						if (-1 === newRel.indexOf('noreferrer')) {
							newRel += ' noreferrer';
						}
					} else {
						// noopener / noreferrerを消す
						newRel = newRel.replace('noopener', '');
						newRel = newRel.replace('noreferrer', '');
					}
					setAttributes({
						isNewTab: value,
						rel: newRel.trim(),
					});

					// 画像ブロックにも反映
					if (siblingsImageId) {
						updateBlockAttributes(siblingsImageId, {
							isNewTab: value,
							rel: newRel.trim(),
						});
					}
				}}
			/>
			<TextControl
				label={__('Link rel')}
				value={rel || ''}
				onChange={(value) => {
					setAttributes({ rel: value });

					// 画像ブロックにも反映
					if (siblingsImageId) {
						updateBlockAttributes(siblingsImageId, {
							rel: value,
						});
					}
				}}
			/>
			<TextareaControl
				label={__('Img tag for measurement', textDomain)}
				// help=''
				value={imgTag}
				rows='4'
				onChange={(html) => {
					setAttributes({ imgTag: html });
				}}
			/>
		</>
	);

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						name='link'
						icon='admin-links' //dashicons-paperclip
						// icon={ <BlockIcon icon={ linkIcon } /> }
						title={__('Link')}
						// shortcut={ displayShortcut.primary( 'k' ) }
						onClick={() => {
							setIsURLPickerOpen(true);
						}}
					/>
				</ToolbarGroup>
			</BlockControls>

			{/* リンク設定用のポップオーバー */}
			{isURLPickerOpen && (
				<Popover
					position='bottom center'
					onClose={() => setIsURLPickerOpen(false)}
				>
					<div className='block-editor-link-control pb-link-popover'>
						{linkControls}
					</div>
				</Popover>
			)}

			<InspectorControls>
				<PanelBody
					title={__('Link settings', textDomain)}
					initialOpen={true}
				>
					{linkControls}
				</PanelBody>
				<PanelBody
					title={__('Button settings', textDomain)}
					initialOpen={true}
				>
					<div className='pb-cvbtn-left-controls'>
						<BaseControl>
							<BaseControl.VisualLabel>
								{__('Left side of button', textDomain)}
							</BaseControl.VisualLabel>
							<ButtonGroup className='pb-btn-group'>
								<Button
									isPrimary={!emIcon}
									onClick={() => {
										setAttributes({ emIcon: '' });
									}}
								>
									{__('Text', textDomain)}
								</Button>
								<Button
									isPrimary={!!emIcon}
									onClick={() => {
										setAttributes({
											emIcon: 'pb-icon-arrow-down',
										});
									}}
								>
									{__('Icon', textDomain)}
								</Button>
							</ButtonGroup>
						</BaseControl>

						<div className='__controls'>
							{!emIcon ? (
								<TextControl
									// label='テキストの内容'
									value={btnEm}
									// className='pb-is-harf-size'
									onChange={(val) => {
										setAttributes({ btnEm: val });
									}}
								/>
							) : (
								<BaseControl>
									<FreePreview
										description={__(
											'you can choose from several types of icons.',
											textDomain
										)}
									>
										{emIconButtons}
									</FreePreview>
								</BaseControl>
							)}
						</div>
					</div>

					<BaseControl>
						<BaseControl.VisualLabel>
							{__(
								'Icon displayed on the right edge of the button',
								textDomain
							)}
						</BaseControl.VisualLabel>
						<FreePreview
							description={__(
								'you can choose from several types of icons.',
								textDomain
							)}
						>
							{arrowIconButtons}
						</FreePreview>
					</BaseControl>
					<ToggleControl
						label={__('Round button', textDomain)}
						checked={isRound}
						onChange={(value) => {
							setAttributes({
								isRound: value,
							});
						}}
					/>
					<ToggleControl
						label={__('Display text link below button', textDomain)}
						checked={isShowLink}
						onChange={(value) => {
							setAttributes({
								isShowLink: value,
							});
							if (value) {
								setAttributes({
									linkLabel: __('Link to : ', textDomain),
								});
								setAttributes({
									linkUrl: url,
								});
							}
						}}
					/>
				</PanelBody>
				<PanelBody
					title={__('Text link settings', textDomain)}
					initialOpen={true}
					className={!isShowLink ? 'pb-is-hide' : null}
				>
					<TextControl
						label={__('Text before URL', textDomain)}
						className='pb-is-harf-size'
						value={linkLabel}
						onChange={(val) => {
							setAttributes({ linkLabel: val });
						}}
					/>
					<TextControl
						label={__('URL text to display', textDomain)}
						// help='※ 実際の遷移先のURLではありません'
						type='url'
						value={linkUrl || url}
						onChange={(val) => {
							setAttributes({ linkUrl: val });
						}}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
