/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
// import { withSelect, useSelect, useDispatch } from '@wordpress/data';
import { PanelBody, BaseControl, ButtonGroup } from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';
/**
 * External dependencies
 */
// import classnames from 'classnames';
import { textDomain, isPro } from '@blocks/config';

/**
 * Custom Component
 */
export default function ( props ) {
	const { attributes, setAttributes } = props;
	const { colSet, bgStyle } = attributes;

	// カラーセット
	const colorSets = [ '1', 'y', 'p', 'g', 'b' ];

	// 背景スタイル
	const bgStyles = [ 'on', 'shadow', 'none' ];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Background style', textDomain ) }
					initialOpen={ true }
				>
					<BaseControl>
						<ButtonGroup className='pb-panel--colorSet'>
							{ bgStyles.map( ( style ) => {
								let isSelected = false;
								if ( bgStyle === style ) {
									isSelected = true;
								}
								const buttonId = 'pb-cvbox-bg-' + style;
								return (
									<div
										className='__btnBox'
										key={ `key_style_${ style }` }
									>
										<button
											type='button'
											id={ buttonId }
											className='__btn'
											onClick={ () => {
												setAttributes( {
													bgStyle: style,
												} );
											} }
										></button>
										<label
											htmlFor={ buttonId }
											className='__label'
											data-selected={ isSelected || null }
										>
											<span
												className='pb-cv-box'
												data-colset={ colSet }
												data-bg={ style }
											>
												<span className='pb-cv-box__inner'>
													{ style }
												</span>
											</span>
										</label>
									</div>
								);
							} ) }
						</ButtonGroup>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={ __( 'Color set', textDomain ) }
					initialOpen={ true }
				>
					<BaseControl>
						<ButtonGroup className='pb-panel--colorSet'>
							{ colorSets.map( ( setNum ) => {
								let isSelected = false;
								if ( colSet === setNum ) {
									isSelected = true;
								}
								const buttonId = 'pb-cvbox-colset-' + setNum;
								return (
									<div
										className='__btnBox'
										key={ `key_style_${ setNum }` }
									>
										<button
											type='button'
											id={ buttonId }
											className='__btn'
											onClick={ () => {
												setAttributes( {
													colSet: setNum,
												} );
											} }
										></button>
										<label
											htmlFor={ buttonId }
											className='__label'
											data-selected={ isSelected || null }
										>
											<span
												className='pb-cv-box'
												data-colset={ setNum }
												data-bg={ bgStyle }
											>
												<span className='pb-cv-box__inner'>
													<span className='pb-list__li pb-icon-check'></span>
													<span className='pb-list__li pb-icon-check'></span>
													<span className='pb-button'>
														<span className='pb-button__btn'>
															<span className='pb-button__em'></span>
															<span className='pb-button__text'></span>
														</span>
													</span>
													<span
														className='pb-cv-box__note'
														data-style='border'
													></span>
												</span>
											</span>
										</label>
									</div>
								);
							} ) }
						</ButtonGroup>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
