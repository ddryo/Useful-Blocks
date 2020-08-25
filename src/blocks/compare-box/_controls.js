/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	PanelBody,
	BaseControl,
	ButtonGroup,
	ToggleControl,
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
export default function ( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { isLimited, colSet } = attributes;

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const blockData = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ],
		[ clientId ]
	);

	// カラーセット
	const colorSets = [ 'y', 'p', 'g', 'b', '1' ];

	const limitSettings = (
		<PanelBody
			title={ __( 'Removal of content restrictions', textDomain ) }
			initialOpen={ true }
		>
			<BaseControl>
				<FreePreview
					description={ __(
						'you can place free contents other than the list.',
						textDomain
					) }
				>
					<ToggleControl
						label={ __(
							'Allow blocks to be placed freely.',
							textDomain
						) }
						checked={ ! isLimited }
						onChange={ ( value ) => {
							const limitedVal = ! value;

							setAttributes( { isLimited: limitedVal } );

							// 子ブロックのattributesも更新
							const innerBlocks = blockData.innerBlocks;
							if ( innerBlocks.length > 0 ) {
								const bodyBlocks = innerBlocks[ 0 ].innerBlocks;
								const leftBodyId = bodyBlocks[ 0 ].clientId;
								const rightBodyId = bodyBlocks[ 1 ].clientId;
								updateBlockAttributes( leftBodyId, {
									isLimited: limitedVal,
								} );
								updateBlockAttributes( rightBodyId, {
									isLimited: limitedVal,
								} );
							}
						} }
					/>
				</FreePreview>
			</BaseControl>
		</PanelBody>
	);

	return (
		<>
			<InspectorControls>
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
								const buttonId = 'pb-compare-colset-' + setNum;
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
												className='pb-compare-box'
												data-colset={ setNum }
											>
												<span className='pb-compare-box__head'>
													<span className='pb-compare-box__head__l'></span>
													<span className='pb-compare-box__head__r'></span>
												</span>
												<span className='pb-compare-box__body'>
													<span className='pb-compare-box__body__l'></span>
													<span className='pb-compare-box__body__r'></span>
												</span>
											</span>
											{ /* <span className='__leftCol'></span>
									<span className='__rightCol'></span> */ }
										</label>
									</div>
								);
							} ) }
						</ButtonGroup>
					</BaseControl>
				</PanelBody>
				{ true && limitSettings }
			</InspectorControls>
		</>
	);
}
