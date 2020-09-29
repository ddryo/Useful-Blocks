/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	// BlockControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	RangeControl,
	ToggleControl,
	BaseControl,
	Button,
	ButtonGroup,
	RadioControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { textDomain, isPro } from '@blocks/config';
import FreePreview from '@blocks/freePreview';

/**
 * External dependencies
 */
// import classnames from 'classnames';

export default function (props) {
	const { attributes, setAttributes } = props;
	const { color, value, label, ratio, isThin } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Title settings', textDomain)}
					initialOpen={true}
				>
					<ToggleControl
						label={__('グラフを薄く表示する', textDomain)}
						checked={isThin}
						onChange={(value) => {
							setAttributes({ isThin: value });
						}}
					/>
					{/* <BaseControl> */}
					<RangeControl
						label={__('グラフの%', textDomain)}
						value={ratio}
						onChange={(val) => {
							setAttributes({ ratio: val });
						}}
						min={0}
						max={100}
					/>
					{/* </BaseControl> */}
				</PanelBody>
			</InspectorControls>
		</>
	);
}
