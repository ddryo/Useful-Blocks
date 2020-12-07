/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, BaseControl, Button, ButtonGroup, TextControl } from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

import { memo } from '@wordpress/element';

/**
 * External dependencies
 */
// import classnames from 'classnames';
import { textDomain } from '@blocks/config';

/**
 * Settings
 */
const sizeButtons = [
	{
		label: '25%',
		val: '25',
	},
	{
		label: '50%',
		val: '50',
	},
	{
		label: '75%',
		val: '75',
	},
	{
		label: '100%',
		val: '',
	},
];

/**
 * Custom Component
 */
export default memo(({ attributes, setAttributes }) => {
	const { url, alt, dataSize } = attributes;

	return (
		<InspectorControls>
			{url && (
				<PanelBody title={__('Image settings', textDomain)} initialOpen={true}>
					<TextControl
						label='alt'
						// type='url'
						value={alt}
						onChange={(val) => {
							setAttributes({ alt: val });
						}}
					/>
					<BaseControl>
						<BaseControl.VisualLabel>
							{__('Image Size', textDomain)}
						</BaseControl.VisualLabel>
						<ButtonGroup className=''>
							{sizeButtons.map((btn) => {
								const btnVal = btn.val;
								const isSelected = btnVal === dataSize;
								return (
									<Button
										// isSecondary
										isSmall
										isPrimary={isSelected}
										key={`pb-img-size-${btnVal}`}
										onClick={() => {
											setAttributes({
												dataSize: btnVal,
											});
										}}
									>
										{btn.label}
									</Button>
								);
							})}
						</ButtonGroup>
					</BaseControl>
				</PanelBody>
			)}
		</InspectorControls>
	);
});
