/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
// import { useSelect } from '@wordpress/data';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { textDomain, blockCategory, iconColor, isPro } from '@blocks/config';
import icon from './_icon';
import MyControls from './_controls';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Block
 */
const blockName = 'pb-bar-graph';

registerBlockType('ponhiro-blocks/bar-graph-item', {
	title: __('Graph', textDomain),
	icon: {
		foreground: iconColor,
		src: icon,
	},
	// keywords: ['ponhiro', 'bar', 'graph'],
	category: blockCategory,
	supports: { className: false },
	parent: ['ponhiro-blocks/bar-graph'],
	attributes: {
		color: {
			type: 'string',
			default: '',
		},
		label: {
			type: 'array',
			source: 'children',
			selector: '.pb-bar-graph__label',
		},
		value: {
			type: 'array',
			source: 'children',
			selector: '.pb-bar-graph__value',
		},
		ratio: {
			type: 'number',
			default: 50,
		},
		isThin: {
			type: 'boolean',
			default: false,
		},
	},

	edit: (props) => {
		const { className, attributes, setAttributes } = props;
		const { color, value, label, ratio, isThin } = attributes;

		return (
			<>
				<MyControls {...props} />
				<div
					className={classnames(`${blockName}__item`, className)}
					data-thin={isThin ? '1' : null}
				>
					<div
						className={`${blockName}__dt`}
						style={{ width: `${ratio}%` }}
					>
						<span
							className={`${blockName}__fill`}
							role='presentation'
							style={color ? { backgroundColor: color } : null}
						></span>
						<RichText
							tagName='span'
							className={`${blockName}__label`}
							placeholder={__('Text…', textDomain)}
							value={label}
							onChange={(val) => setAttributes({ label: val })}
						/>
					</div>
					<div className={`${blockName}__dd`}>
						<RichText
							tagName='span'
							className={`${blockName}__value`}
							placeholder={__('Text…', textDomain)}
							value={value}
							onChange={(val) => setAttributes({ value: val })}
						/>
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { color, value, label, ratio, isThin } = attributes;
		return (
			<div
				className={`${blockName}__item`}
				data-thin={isThin ? '1' : null}
			>
				<dt
					className={`${blockName}__dt`}
					style={{ width: `${ratio}%` }}
				>
					<span
						className={`${blockName}__fill`}
						style={color ? { backgroundColor: color } : null}
						role='presentation'
					></span>
					<RichText.Content
						tagName='span'
						className={`${blockName}__label`}
						value={label}
					/>
				</dt>
				<dd className={`${blockName}__dd`}>
					<RichText.Content
						tagName='span'
						className={`${blockName}__value`}
						value={value}
					/>
				</dd>
			</div>
		);
	},
});
