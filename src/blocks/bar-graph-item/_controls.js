/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	BaseControl,
	ColorPalette,
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

	// const capBlockColors = window.capBlockColors;

	const colorCtrl = (
		<ColorPalette
			value={color}
			// disableCustomColors={true}
			colors={[
				{
					name: '01',
					color: 'var(--pb_colset_bar_01)',
				},
				{
					name: '02',
					color: 'var(--pb_colset_bar_02)',
				},
				{
					name: '03',
					color: 'var(--pb_colset_bar_03)',
				},
				{
					name: '04',
					color: 'var(--pb_colset_bar_04)',
				},
			]}
			onChange={(val) => {
				if (!isPro) return;
				setAttributes({ color: val });
			}}
		/>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={
						<>
							{__('Graph Color', textDomain)}
							{color && (
								<span
									className='component-color-indicator -pb'
									style={{ backgroundColor: color }}
								></span>
							)}
						</>
					}
					initialOpen={true}
				>
					<BaseControl>
						<FreePreview
							description={__(
								'you can choose the color of the graph as you like.',
								textDomain
							)}
						>
							{colorCtrl}
						</FreePreview>
					</BaseControl>
					<BaseControl>
						<ToggleControl
							label={__('Lighten the color', textDomain)}
							checked={isThin}
							onChange={(colorValue) => {
								setAttributes({ isThin: colorValue });
							}}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Percentage of graph', textDomain) + '( % )'}
					initialOpen={true}
				>
					<RangeControl
						value={ratio}
						onChange={(val) => {
							setAttributes({ ratio: val });
						}}
						min={0}
						max={100}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
