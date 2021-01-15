/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	Button,
	RangeControl,
	// ToggleControl,
	RadioControl,
	// BaseControl,
	// ColorPalette,
	TextControl,
} from '@wordpress/components';
import { createInterpolateElement } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import FreePreview from '@blocks/freePreview';
import { textDomain, isPro } from '@blocks/config';

/**
 * 設定項目
 */
const maxStepOptions = [
	{
		label: __('3 stages', textDomain),
		value: 3,
	},
	{
		label: __('5 stages', textDomain),
		value: 5,
	},
];
const markTypeOptions = [
	{
		label: __('Dot', textDomain),
		value: 'dot',
	},
	{
		label: __('Icon', textDomain),
		value: 'icon',
	},
	{
		label: __('Image', textDomain),
		value: 'image',
	},
];

export default ({ attributes, setAttributes }) => {
	const { activeNum, maxStep, markType, iconClass, mediaId, mediaUrl } = attributes;

	/* eslint jsx-a11y/anchor-has-content: 0 */
	const faNote = createInterpolateElement(
		__(
			'You can specify the class name of the "solid" type <a>Font Awesome icon</a>.',
			textDomain
		),
		{
			a: (
				<a
					href='https://fontawesome.com/icons?d=gallery'
					target='_blank'
					rel='noopener noreferrer'
				/>
			),
		}
	);

	const setImage = (media) => {
		setAttributes({
			mediaId: media.id,
			mediaUrl: media.url,
		});
	};

	const removeImage = () => {
		setAttributes({
			mediaId: 0,
			mediaUrl: '',
		});
	};
	return (
		<>
			<PanelBody title={__('Graph setting', textDomain)} initialOpen={true}>
				<RadioControl
					label={__('Number of steps in the graph', textDomain)} // グラフの段階数
					selected={maxStep}
					options={maxStepOptions}
					onChange={(val) => {
						const newVal = parseInt(val);
						setAttributes({ maxStep: newVal });
						if (activeNum > newVal) {
							setAttributes({ activeNum: 3 });
						}
					}}
				/>
				<RangeControl
					label={__('Position of active point', textDomain)}
					value={activeNum}
					onChange={(val) => {
						setAttributes({ activeNum: val });
					}}
					min={1}
					max={maxStep}
				/>
				<FreePreview description={__('you can use icons and images.', textDomain)}>
					<RadioControl
						label={__('Active point shape', textDomain)}
						selected={markType}
						options={markTypeOptions}
						onChange={(val) => {
							if (!isPro) return;
							setAttributes({ markType: val });
						}}
					/>
					{'icon' === markType && (
						<TextControl
							label={__('Icon class', textDomain)}
							value={iconClass}
							help={faNote}
							onChange={(val) => {
								setAttributes({ iconClass: val });
							}}
						/>
					)}
					{'image' === markType && (
						<div className='pb-media-setting -rating-graph'>
							<div className='pb-media-setting__preview'>
								{mediaUrl && <img src={mediaUrl} alt='' />}
							</div>
							<div className='pb-media-setting__btns'>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => {
											// console.log(media);
											if (media) {
												setImage(media);
											} else {
												removeImage();
											}
										}}
										allowedTypes={['image', 'video']}
										value={mediaId}
										render={({ open }) => (
											<Button isPrimary onClick={open}>
												{mediaUrl
													? __('Change media', textDomain)
													: __('Select media', textDomain)}
											</Button>
										)}
									/>
								</MediaUploadCheck>
								{mediaUrl && (
									<Button
										isSecondary
										className='__delete'
										onClick={() => {
											removeImage();
										}}
									>
										{__('Delete', textDomain)}
									</Button>
								)}
							</div>
						</div>
					)}
				</FreePreview>
			</PanelBody>
		</>
	);
};
