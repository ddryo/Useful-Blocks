/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, BaseControl, Button, ButtonGroup } from '@wordpress/components';

/**
 * Internal dependencies
 */
import FreePreview from '@blocks/freePreview';
import { textDomain } from '@blocks/config';

/**
 * component
 */
const ColsetDOM = ({ colset }) => {
	return (
		<span className='pb-bar-graph' data-colset={colset} data-bg='1'>
			<span className='pb-bar-graph__dl' data-bg='1'>
				<span className='pb-bar-graph__item'>
					<span className='pb-bar-graph__dt'>
						<span className='pb-bar-graph__fill'></span>
					</span>
					<span className='pb-bar-graph__dd'></span>
				</span>
				<span className='pb-bar-graph__item'>
					<span className='pb-bar-graph__dt'>
						<span className='pb-bar-graph__fill'></span>
					</span>
					<span className='pb-bar-graph__dd'></span>
				</span>
			</span>
		</span>
	);
};

/**
 * 設定
 */
// カラーセット
const colorSets = ['y', 'p', 'g', 'b', '1'];

// 右テキストの位置
const valuePosChoices = {
	left: __('Left justified', textDomain),
	right: __('Right justified', textDomain),
};

// 左テキストの位置
const labelPosChoices = {
	top: __('Top', textDomain),
	inner: __('Inner', textDomain),
};

/**
 * InspectorControls
 */
export default ({ attributes, setAttributes }) => {
	const { colSet } = attributes;

	return (
		<>
			<PanelBody title={__('Color set', textDomain)} initialOpen={true}>
				<BaseControl>
					<ButtonGroup className='pb-panel--colorSet -rating-graph'>
						{colorSets.map((setNum) => {
							const isSelected = colSet === setNum;
							const buttonId = 'pb-iconbox-colset-' + setNum;
							return (
								<div className='__btnBox' key={`key_style_${setNum}`}>
									<button
										type='button'
										id={buttonId}
										className='__btn'
										onClick={() => {
											setAttributes({
												colSet: setNum,
											});
										}}
									></button>
									<label
										htmlFor={buttonId}
										className='__label'
										data-selected={isSelected || null}
									>
										<ColsetDOM colset={setNum} />
									</label>
								</div>
							);
						})}
					</ButtonGroup>
				</BaseControl>
			</PanelBody>
		</>
	);
};
