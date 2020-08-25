/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	IconButton,
	Toolbar,
	// Tooltip,
	// ToolbarButton,
	BaseControl,
	Button,
	ButtonGroup,
	TextControl,
} from '@wordpress/components';

import {
	BlockControls,
	InspectorControls,
	MediaReplaceFlow,
	// RichText,
} from '@wordpress/block-editor';

/**
 * External dependencies
 */
// import classnames from 'classnames';
import { textDomain, isPro } from '@blocks/config';

/**
 * Custom Component
 */
export default function ( props ) {
	const { attributes, setAttributes, onSelectImage, onSelectURL } = props;
	const { id, url, alt, dataSize } = attributes;

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

	return (
		<>
			<BlockControls>
				{ url && (
					<>
						<MediaReplaceFlow
							mediaId={ id }
							mediaURL={ url }
							allowedTypes={ [ 'image' ] }
							accept='image/*'
							onSelect={ onSelectImage }
							onSelectURL={ onSelectURL }
							// onError={ this.onUploadError }
						/>
						<Toolbar>
							<IconButton
								className='components-toolbar__control'
								label={ __( 'Delete image', textDomain ) }
								icon='no-alt'
								onClick={ () => {
									setAttributes( {
										id: undefined,
										url: undefined,
										alt: undefined,
									} );
								} }
							/>
						</Toolbar>
					</>
				) }
			</BlockControls>

			<InspectorControls>
				{ url && (
					<PanelBody
						title={ __( 'Image settings', textDomain ) }
						initialOpen={ true }
					>
						<TextControl
							label='alt'
							// type='url'
							value={ alt }
							onChange={ ( val ) => {
								setAttributes( { alt: val } );
							} }
						/>
						<BaseControl>
							<BaseControl.VisualLabel>
								{ __( 'Image Size', textDomain ) }
							</BaseControl.VisualLabel>
							<ButtonGroup className=''>
								{ sizeButtons.map( ( btn ) => {
									const btnVal = btn.val;
									const isSelected = btnVal === dataSize;
									return (
										<Button
											// isSecondary
											isSmall
											isPrimary={ isSelected }
											key={ `pb-img-size-${ btnVal }` }
											onClick={ () => {
												setAttributes( {
													dataSize: btnVal,
												} );
											} }
										>
											{ btn.label }
										</Button>
									);
								} ) }
							</ButtonGroup>
						</BaseControl>
					</PanelBody>
				) }
			</InspectorControls>
		</>
	);
}
