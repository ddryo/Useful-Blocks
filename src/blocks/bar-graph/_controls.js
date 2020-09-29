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
	const {
		colSet,
		title,
		ttlData,
		bg,
		barBg,
		valuePos,
		labelPos,
	} = attributes;

	const valuePosChoices = {
		left: __('Left', textDomain),
		right: __('Right', textDomain),
	};

	const labelPosChoices = {
		top: __('Top', textDomain),
		inner: __('Inner', textDomain),
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Title settings', textDomain)}
					initialOpen={true}
				>
					<RadioControl
						label={__('タイトルの表示設定', textDomain)}
						selected={ttlData}
						options={[
							{
								label: __('非表示', textDomain),
								value: 'none',
							},
							{
								label: __('線なし', textDomain),
								value: 'normal',
							},
							{
								label: __('下に線あり', textDomain),
								value: 'border',
							},
						]}
						onChange={(value) => {
							setAttributes({ ttlData: value });
						}}
					/>
					<ToggleControl
						label={__('グラフ全体の背景色を表示', textDomain)}
						checked={bg}
						onChange={(value) => {
							setAttributes({ bg: value });
						}}
					/>
					<ToggleControl
						label={__('棒グラフ右側の背景色を表示', textDomain)}
						checked={barBg}
						onChange={(value) => {
							setAttributes({ barBg: value });
						}}
					/>
					<BaseControl>
						<BaseControl.VisualLabel>
							{__('グラフ右側のテキストの位置', textDomain)}
						</BaseControl.VisualLabel>
						<ButtonGroup className='pb-btn-group'>
							{Object.keys(valuePosChoices).map((pos) => {
								return (
									<Button
										key={`key_${pos}`}
										isPrimary={pos === valuePos}
										onClick={() => {
											setAttributes({ valuePos: pos });
										}}
									>
										{valuePosChoices[pos]}
									</Button>
								);
							})}
						</ButtonGroup>
					</BaseControl>
					<BaseControl>
						<BaseControl.VisualLabel>
							{__('グラフ左側のテキストの位置', textDomain)}
						</BaseControl.VisualLabel>
						<ButtonGroup className='pb-btn-group'>
							{Object.keys(labelPosChoices).map((pos) => {
								return (
									<Button
										key={`key_${pos}`}
										isPrimary={pos === labelPos}
										onClick={() => {
											setAttributes({ labelPos: pos });
										}}
									>
										{labelPosChoices[pos]}
									</Button>
								);
							})}
						</ButtonGroup>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
