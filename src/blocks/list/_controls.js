/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';

import {
	PanelBody,
	BaseControl,
	Button,
	ButtonGroup,
	ToolbarGroup,
	ToggleControl,
} from '@wordpress/components';
import {
	formatListBullets,
	formatListNumbered,
	// formatIndent,
	// formatOutdent,
} from '@wordpress/icons';

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
	const { listTag, icon, showBorder } = attributes;

	// olのアイコン
	const olIcons = [
		{
			val: 'circle',
		},
		{
			val: 'square',
		},
	];

	// ulのアイコン
	const ulIcons = [
		{
			val: 'dot',
		},
		{
			val: 'check',
		},
		{
			val: 'chevron-right',
		},
		{
			val: 'comment',
		},
	];

	const listIconButtons = (
		<>
			{'ul' === listTag ? (
				<ButtonGroup className='pb-btn-group -wide-btns'>
					{ulIcons.map((_icon) => {
						const iconVal = _icon.val;
						const isSelected = iconVal === icon;
						return (
							<Button
								// isSecondary
								isPrimary={isSelected}
								key={`pb-ul-icon-${iconVal}`}
								onClick={() => {
									if (!isPro) return;
									setAttributes({
										icon: iconVal,
									});
								}}
							>
								<i className={'pb-icon-' + iconVal}></i>
							</Button>
						);
					})}
				</ButtonGroup>
			) : (
				<ButtonGroup className='pb-btn-group -wide-btns'>
					{olIcons.map((_icon) => {
						const iconVal = _icon.val;
						const isSelected = iconVal === icon;
						return (
							<Button
								// isSecondary
								isPrimary={isSelected}
								key={`pb-ul-icon-${iconVal}`}
								onClick={() => {
									if (!isPro) return;
									setAttributes({
										icon: iconVal,
									});
								}}
							>
								<i className={'pb-icon-' + iconVal}>
									{iconVal}
								</i>
							</Button>
						);
					})}
				</ButtonGroup>
			)}
		</>
	);

	return (
		<>
			<BlockControls>
				<ToolbarGroup
					controls={[
						{
							icon: formatListBullets,
							title: __('Convert to unordered list'),
							isActive: listTag === 'ul',
							onClick() {
								setAttributes({ listTag: 'ul' });
								setAttributes({ icon: 'check' });
							},
						},
						{
							icon: formatListNumbered,
							title: __('Convert to ordered list'),
							isActive: listTag === 'ol',
							onClick() {
								setAttributes({ listTag: 'ol' });
								setAttributes({ icon: 'circle' });
							},
						},
					]}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('List settings', textDomain)}
					initialOpen={true}
				>
					<ToggleControl
						label={__(
							'Add a dotted line below the list',
							textDomain
						)}
						checked={showBorder}
						onChange={(value) => {
							setAttributes({
								showBorder: value,
							});
						}}
					/>
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
							{listIconButtons}
						</FreePreview>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
