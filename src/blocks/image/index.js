/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
// import {} from '@wordpress/components';
import { image as imgIcon } from '@wordpress/icons';

import {
	BlockIcon,
	MediaPlaceholder,
	// RichText,
} from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';
import pbIcon from '@blocks/icon';
import { textDomain, blockCategory, isPro } from '@blocks/config';

/**
 * Internal dependencies
 */
import MyControls from './_controls';

/**
 * Block
 */
const blockName = 'pb-image';

registerBlockType( 'ponhiro-blocks/image', {
	title: __( 'CV Image', textDomain ),
	icon: {
		foreground: pbIcon.color,
		src: pbIcon.cvBox,
	},
	keywords: [ 'ponhiro', 'image' ],
	category: blockCategory,
	supports: { className: false, reusable: false },
	parent: [ 'ponhiro-blocks/cv-box' ],

	attributes: {
		id: {
			type: 'number',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: '',
		},
		dataSize: {
			type: 'string',
			source: 'attribute',
			selector: 'figure',
			attribute: 'data-size',
			default: '',
		},

		// リンク系は親ブロックから渡ってきたりするので source: 'attribute' はNG
		href: {
			type: 'string',
			default: '',
		},
		rel: {
			type: 'string',
			default: '',
		},
		isNewTab: {
			type: 'boolean',
			default: false,
		},
	},

	edit: ( props ) => {
		const { attributes, setAttributes, className, noticeUI } = props;
		const { url, alt, id, href, dataSize } = attributes;
		const blockClass = classnames(
			blockName,
			className,
			'-ponhiro-blocks'
		);

		// 画像ソース
		const isExternal = ! id;
		const src = isExternal ? url : undefined;

		const onSelectImage = ( media ) => {
			// console.log( media );
			if ( ! media || ! media.url ) {
				// メディア情報が取得できなかった時
				setAttributes( {
					url: undefined,
					alt: undefined,
					id: undefined,
				} );
				return;
			}

			setAttributes( {
				url: media.url,
				alt: media.alt,
				id: media.id,
			} );
		};

		const onSelectURL = ( newURL ) => {
			if ( newURL !== url ) {
				setAttributes( {
					url: newURL,
					id: undefined,
				} );
			}
		};

		const imgTag = (
			<img
				className={ `${ blockName }__img` }
				src={ url }
				alt={ alt || '' }
			/>
		);

		if ( ! isPro ) {
			return null;
			// return (
			// 	<div className='pb-free-noticeBox -image'>
			// 		{__(
			// 			'In the pro version, you can place your favorite image here.',
			// 			textDomain
			// 		)}
			// 	</div>
			// );
		}
		return (
			<>
				<MyControls
					{ ...props }
					onSelectImage={ onSelectImage }
					onSelectURL={ onSelectURL }
				/>
				{ ! url ? (
					<MediaPlaceholder
						// icon='image'
						icon={ <BlockIcon icon={ imgIcon } /> }
						onSelect={ onSelectImage }
						onSelectURL={ onSelectURL }
						notices={ noticeUI }
						// onError={ this.onUploadError }
						accept='image/*'
						allowedTypes={ [ 'image' ] }
						value={ { id, src } }
						mediaPreview={
							!! url && (
								<img
									alt={ __( 'Edit image' ) }
									title={ __( 'Edit image' ) }
									className={ 'edit-image-preview' }
									src={ url }
								/>
							)
						}
						disableMediaButtons={ url }
						// isAppender={ true }
					/>
				) : (
					<figure
						className={ blockClass }
						data-size={ dataSize || null }
					>
						{ href ? (
							<div
								// href={ href }
								className={ `${ blockName }__link` }
							>
								{ imgTag }
							</div>
						) : (
							imgTag
						) }
					</figure>
				) }
			</>
		);
	},

	save: ( { attributes } ) => {
		const { url, alt, href, rel, isNewTab, dataSize } = attributes;
		const blockClass = blockName;
		if ( ! url ) {
			return null;
		}
		const imgTag = (
			<img
				className={ `${ blockName }__img` }
				src={ url }
				alt={ alt || '' }
			/>
		);

		return (
			<>
				<figure className={ blockClass } data-size={ dataSize || null }>
					{ href ? (
						<a
							href={ href }
							className={ `${ blockName }__link` }
							target={ isNewTab ? '_blank' : null }
							rel={ rel || null }
						>
							{ imgTag }
						</a>
					) : (
						imgTag
					) }
				</figure>
			</>
		);
	},
} );
