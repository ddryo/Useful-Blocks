/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { memo } from '@wordpress/element';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';

/**
 * External dependencies
 */
// import classnames from 'classnames';
import { textDomain } from '@blocks/config';

/**
 * Custom Component
 */
export default memo((props) => {
	const { id, url, onSelectImage, onSelectURL, deleteImage } = props;

	return (
		<BlockControls>
			{url && (
				<>
					<MediaReplaceFlow
						mediaId={id}
						mediaURL={url}
						allowedTypes={['image']}
						accept='image/*'
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
						// onError={ this.onUploadError }
					/>
					<ToolbarGroup>
						<ToolbarButton
							className='components-toolbar__control'
							label={__('Delete image', textDomain)}
							icon='no-alt'
							onClick={() => {
								deleteImage();
							}}
						/>
					</ToolbarGroup>
				</>
			)}
		</BlockControls>
	);
});
