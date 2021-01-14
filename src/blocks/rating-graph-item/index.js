/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
// import { useSelect } from '@wordpress/data';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import icon from './_icon';
import MyControls from './_controls';
import { textDomain, iconColor } from '@blocks/config';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * metadata
 */
import metadata from './block.json';
const { name, parent, supports, category } = metadata;

/**
 * Block
 */
const blockName = 'pb-rating-graph';

registerBlockType(name, {
	title: __('Graph', textDomain),
	icon: {
		foreground: iconColor,
		src: icon,
	},
	// keywords: [],
	category,
	supports,
	parent,
	attributes: metadata.attributes,
	edit: ({ attributes, setAttributes }) => {
		const { graphLabel, leftLabel, rightLabel, activeNum, maxNum } = attributes;

		const blockProps = useBlockProps({
			className: `${blockName}__item`,
		});

		const mapNums = maxNum === 5 ? [1, 2, 3, 4, 5] : [1, 2, 3];
		const scales = mapNums.map((num) => {
			return (
				<div
					className={`${blockName}__scale`}
					data-check={activeNum === num ? '1' : null}
					key={`scale_key_${num}`}
				>
					<div className={`__shape -dot`}></div>
					<div className={`__label`}>{num}</div>
				</div>
			);
		});

		return (
			<>
				{/* <InspectorControls>
					<MyControls {...{ attributes, setAttributes }} />
				</InspectorControls> */}
				<div {...blockProps}>
					<RichText
						tagName='span'
						className={classnames(`${blockName}__label`, {
							'is-null': RichText.isEmpty(graphLabel),
						})}
						placeholder={__('Graph Label', textDomain)}
						value={graphLabel}
						onChange={(val) => setAttributes({ graphLabel: val })}
					/>
					<div className={`${blockName}__wrap`}>
						<RichText
							tagName='div'
							className={classnames(`${blockName}__basis -left`, {
								'is-null': RichText.isEmpty(leftLabel),
							})}
							placeholder={__('Label…', textDomain)}
							value={leftLabel}
							onChange={(val) => setAttributes({ leftLabel: val })}
						/>
						<div className={`${blockName}__axis`}>{scales}</div>
						<RichText
							tagName='div'
							className={classnames(`${blockName}__basis -right`, {
								'is-null': RichText.isEmpty(rightLabel),
							})}
							placeholder={__('Label…', textDomain)}
							value={rightLabel}
							onChange={(val) => setAttributes({ rightLabel: val })}
						/>
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { graphLabel, leftLabel, rightLabel, activeNum, maxNum } = attributes;

		const blockProps = useBlockProps.save({
			className: `${blockName}__item`,
		});

		const mapNums = maxNum === 5 ? [1, 2, 3, 4, 5] : [1, 2, 3];
		const scales = mapNums.map((num) => {
			return (
				<div
					className={`${blockName}__scale`}
					key={`scale_key_${num}`}
					data-check={activeNum === num ? '1' : null}
				>
					<div className={`__shape -dot`}></div>
					<div className={`__label`}>{num}</div>
				</div>
			);
		});
		return (
			<div {...blockProps}>
				{!RichText.isEmpty(graphLabel) && (
					<RichText.Content
						tagName='span'
						className={`${blockName}__label`}
						value={graphLabel}
					/>
				)}

				<div className={`${blockName}__wrap`}>
					<div className={`${blockName}__basis -left`}>{leftLabel}</div>
					<div className={`${blockName}__axis`}>{scales}</div>
					<div className={`${blockName}__basis -right`}>{rightLabel}</div>
				</div>
			</div>
		);
	},
});
