/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

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
const blockName = 'pb-cv-box__note';

registerBlockType('ponhiro-blocks/cv-box-note', {
	title: __('CV Text', textDomain),
	icon: {
		foreground: pbIcon.color,
		src: pbIcon.cvBox,
	},
	keywords: ['ponhiro', 'button'],
	category: blockCategory,
	supports: { className: false, reusable: false },
	parent: ['ponhiro-blocks/cv-box'],
	attributes: {
		icon: {
			type: 'string',
			default: '',
		},
		dataStyle: {
			type: 'string',
			source: 'attribute',
			attribute: 'data-style',
			selector: '.pb-cv-box__note',
			default: 'border',
		},
		content: {
			type: 'array',
			source: 'children',
			selector: '.__text',
		},
	},

	edit: (props) => {
		const { className, attributes, setAttributes } = props;
		const { content, icon, dataStyle } = attributes;
		let blockClass = classnames(blockName, className);

		if (content.length === 0) {
			blockClass = classnames(blockClass, 'has-no-content');
		}

		return (
			<>
				<MyControls {...props} />
				<div className={blockClass} data-style={dataStyle}>
					{icon && (
						<div className='__icon'>
							<i className={icon}></i>
						</div>
					)}
					<RichText
						tagName='div'
						className='__text'
						placeholder={__('Text…', textDomain)}
						value={content}
						onChange={(value) => setAttributes({ content: value })}
					/>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { content, icon, dataStyle } = attributes;
		if (content.length === 0) {
			return null;
		}
		return (
			<div className={blockName} data-style={dataStyle}>
				{icon && (
					<div className='__icon'>
						<i className={icon}></i>
					</div>
				)}
				<RichText.Content
					tagName='div'
					className='__text'
					value={content}
				/>
			</div>
		);
	},
});
