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
import { textDomain, blockCategory, isPro } from '@blocks/config';

/**
 * Internal dependencies
 */
import MyControls from './_controls';
// import './scss/_inline.scss';

/**
 * Block
 */
const blockName = 'pb-iconbox';

registerBlockType('ponhiro-blocks/iconbox', {
	title: __('Icon box', textDomain),
	icon: {
		foreground: pbIcon.color,
		src: pbIcon.compareBox,
	},
	keywords: ['ponhiro', 'useful-block', 'iconbox'],
	category: blockCategory,
	supports: { className: false },
	attributes: {
		mediaId: {
			type: 'number',
		},
		mediaUrl: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		headTitle: {
			type: 'array',
			source: 'children',
			selector: '.pb-iconbox__head',
		},
		comment: {
			type: 'array',
			source: 'children',
			selector: '.pb-iconbox__comment',
		},
		commentStyle: {
			type: 'string',
			default: 'normal',
		},
		colSet: {
			type: 'string',
			default: 'y',
		},
		iconSet: {
			type: 'string',
			default: '01',
		},
		iconPos: {
			type: 'string',
			default: 'right',
		},
		isCenter: {
			type: 'boolean',
			default: false,
		},
	},

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

		const iconboxFigure = (
			<div
				className={
					iconPos === 'top'
						? `${blockName}__topIcon`
						: `${blockName}__innerIcon`
				}
			>
				<RichText
					tagName='div'
					className={classnames(
						`${blockName}__comment -${commentStyle}`,
						{
							'pb-is-empty': comment.length === 0,
						}
					)}
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
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectImage}
								allowedTypes={'image'}
								value={mediaId}
								render={({ open }) => (
									<Button
										onClick={open}
										className='__changeImage'
									>
										画像を変更
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{mediaUrl && (
							<img
								className={`${blockName}__img`}
								src={mediaUrl}
								alt=''
							/>
						)}
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
				<MyControls {...props} />
				<div
					className={blockClass}
					data-colset={colSet}
					data-icon={iconPos}
				>
					{iconPos === 'top' && iconboxFigure}
					<div className={`${blockName}__inner`}>
						<RichText
							tagName='div'
							className={classnames(`${blockName}__head`, {
								'pb-is-empty': headTitle.length === 0,
							})}
							placeholder={__('…', textDomain)}
							value={headTitle}
							onChange={(value) =>
								setAttributes({ headTitle: value })
							}
						/>
						<div
							className={`${blockName}__body`}
							data-align={isCenter ? 'center' : null}
						>
							<InnerBlocks
								className={`${blockName}__content`}
								allowedBlocks={[
									'core/paragraph',
									'ponhiro-blocks/list',
								]}
								templateLock={false} //insert'
								// template={[['core/paragraph', {}, []]]}
							/>
							{iconPos !== 'top' && iconboxFigure}
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
		} = attributes;
		const blockClass = classnames(blockName);

		const iconboxFigure = (
			<div
				className={
					iconPos === 'top'
						? `${blockName}__topIcon`
						: `${blockName}__innerIcon`
				}
			>
				{comment.length > 0 && (
					<div className={`${blockName}__comment -${commentStyle}`}>
						{comment}
					</div>
				)}
				<figure
					className={`${blockName}__figure`}
					data-iconset={iconSet || null}
				>
					{!!mediaUrl && (
						<img
							className={`${blockName}__icon -no-lb`}
							src={mediaUrl}
							alt=''
						/>
					)}
				</figure>
			</div>
		);
		return (
			<div
				className={blockClass}
				data-colset={colSet}
				data-icon={iconPos}
			>
				{iconPos === 'top' && iconboxFigure}
				<div className={`${blockName}__inner`}>
					{headTitle.length > 0 && (
						<div className={`${blockName}__head`}>{headTitle}</div>
					)}
					<div
						className={`${blockName}__body`}
						data-align={isCenter ? 'center' : null}
					>
						<div className={`${blockName}__content`}>
							<InnerBlocks.Content />
						</div>
						{iconPos !== 'top' && iconboxFigure}
					</div>
				</div>
			</div>
		);
	},
});
