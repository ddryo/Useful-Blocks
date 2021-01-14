/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	RichText,
	InnerBlocks,
	BlockIcon,
	MediaPlaceholder,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { image as imgIcon } from '@wordpress/icons';

/**
 * External dependencies
 */
import classnames from 'classnames';
import pbIcon from '@blocks/icon';
import {
	textDomain,
	// isPro
} from '@blocks/config';

/**
 * Internal dependencies
 */
import MyControls from './_controls';
// import './scss/_inline.scss';

/**
 * metadata
 */
import metadata from './block.json';
const { name, category, keywords, supports } = metadata;

/**
 * Block
 */
const blockName = 'pb-iconbox';

registerBlockType(name, {
	title: __('Icon box', textDomain),
	icon: {
		foreground: pbIcon.color,
		src: pbIcon.iconbox,
	},
	keywords,
	category,
	supports,
	attributes: metadata.attributes,
	edit: (props) => {
		const { className, attributes, setAttributes, noticeUI } = props;
		const {
			headTitle,
			comment,
			mediaUrl,
			mediaId,
			colSet,
			iconSet,
			iconPos,
			isCenter,
			commentStyle,
			iconY,
		} = attributes;
		const blockClass = classnames(blockName, className, '-ponhiro-blocks');

		// 画像ソース
		// const isExternal = !mediaId;
		// const src = isExternal ? mediaUrl : undefined;

		const onSelectImage = (media) => {
			if (!media || !media.url) {
				// メディア情報が取得できなかった時
				setAttributes({
					mediaUrl: undefined,
					mediaId: undefined,
				});
				return;
			}
			setAttributes({
				mediaUrl: media.url,
				mediaId: media.id,
				iconSet: '',
			});
		};

		// const removeImage = () => {
		// 	setAttributes({
		// 		mediaUrl: undefined,
		// 		mediaId: undefined,
		// 	});
		// };

		const isTopIcon = -1 !== iconPos.indexOf('top');

		const iconboxFigure = (
			<div className={isTopIcon ? `${blockName}__topIcon` : `${blockName}__innerIcon`}>
				<RichText
					tagName='div'
					className={classnames(`${blockName}__comment -${commentStyle}`, {
						'pb-is-empty': comment.length === 0,
					})}
					placeholder={__('…', textDomain)}
					value={comment}
					onChange={(value) => setAttributes({ comment: value })}
				/>
				{!mediaUrl && !iconSet ? (
					<MediaPlaceholder
						icon={<BlockIcon icon={imgIcon} />}
						onSelect={onSelectImage}
						notices={noticeUI}
						accept='image/*'
						allowedTypes={['image']}
					/>
				) : (
					<div
						className={`${blockName}__figure __mediaWrap`}
						data-iconset={iconSet || null}
						style={isTopIcon && 0 !== iconY ? { top: `${iconY}px` } : null}
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectImage}
								allowedTypes={'image'}
								value={mediaId}
								render={({ open }) => (
									<Button onClick={open} className='__changeImage'>
										画像を変更
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{mediaUrl && <img className={`${blockName}__img`} src={mediaUrl} alt='' />}
						{/* <Button
							onClick={removeImage}
							isTertiary
						>
							{__('Remove')}
						</Button> */}
					</div>
				)}
			</div>
		);

		return (
			<>
				<MyControls {...{ attributes, setAttributes }} />
				<div className={blockClass} data-colset={colSet} data-icon={iconPos}>
					{isTopIcon && iconboxFigure}
					<div className={`${blockName}__inner`}>
						<RichText
							tagName='div'
							className={classnames(`${blockName}__head`, {
								'pb-is-empty': headTitle.length === 0,
							})}
							placeholder={__('…', textDomain)}
							value={headTitle}
							onChange={(value) => setAttributes({ headTitle: value })}
						/>
						<div
							className={`${blockName}__body`}
							data-align={isCenter ? 'center' : null}
						>
							<InnerBlocks
								className={`${blockName}__content`}
								allowedBlocks={['core/paragraph', 'ponhiro-blocks/list']}
								templateLock={false} //insert'
								// template={[['core/paragraph', {}, []]]}
							/>
							{!isTopIcon && iconboxFigure}
						</div>
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const {
			headTitle,
			comment,
			colSet,
			iconSet,
			mediaUrl,
			iconPos,
			isCenter,
			commentStyle,
			iconY,
		} = attributes;
		const blockClass = classnames(blockName);

		const isTopIcon = -1 !== iconPos.indexOf('top');

		const iconboxFigure = (
			<div className={isTopIcon ? `${blockName}__topIcon` : `${blockName}__innerIcon`}>
				{comment.length > 0 && (
					<div className={`${blockName}__comment -${commentStyle}`}>{comment}</div>
				)}
				<figure
					className={`${blockName}__figure`}
					data-iconset={iconSet || null}
					style={isTopIcon && 0 !== iconY ? { top: `${iconY}px` } : null}
				>
					{!!mediaUrl && (
						<img className={`${blockName}__icon -no-lb`} src={mediaUrl} alt='' />
					)}
				</figure>
			</div>
		);
		return (
			<div className={blockClass} data-colset={colSet} data-icon={iconPos}>
				{isTopIcon && iconboxFigure}
				<div className={`${blockName}__inner`}>
					{headTitle.length > 0 && (
						<div className={`${blockName}__head`}>{headTitle}</div>
					)}
					<div className={`${blockName}__body`} data-align={isCenter ? 'center' : null}>
						<div className={`${blockName}__content`}>
							<InnerBlocks.Content />
						</div>
						{!isTopIcon && iconboxFigure}
					</div>
				</div>
			</div>
		);
	},
});
