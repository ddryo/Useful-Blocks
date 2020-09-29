/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	// RichText,
	InnerBlocks,
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
const blockName = 'pb-cv-box';

registerBlockType('ponhiro-blocks/cv-box', {
	title: __('CV Box', textDomain),
	icon: {
		foreground: pbIcon.color,
		src: pbIcon.cvBox,
	},
	keywords: ['ponhiro', 'useful-block', 'cv-btn', 'btn'],
	category: blockCategory,
	supports: { className: false },
	attributes: {
		colSet: {
			type: 'string',
			default: '1',
		},
		bgStyle: {
			type: 'string',
			default: 'on',
		},
		// note: {
		// 	type: 'array',
		// 	source: 'children',
		// 	selector: '.pb-cv-box__note',
		// },
	},

	edit: (props) => {
		const { className, attributes } = props;
		const { colSet, bgStyle } = attributes;
		let blockClass = classnames(blockName, className, '-ponhiro-blocks');
		if (!isPro) {
			blockClass = classnames(blockClass, '-is-free');
		}

		return (
			<>
				<MyControls {...props} />
				<div
					className={blockClass}
					data-colset={colSet}
					data-bg={bgStyle}
				>
					<div className={`${blockName}__inner`}>
						<InnerBlocks
							allowedBlocks={[
								'ponhiro-blocks/list',
								'ponhiro-blocks/image',
								'ponhiro-blocks/button',
								'ponhiro-blocks/cv-box-note',
							]}
							templateLock={'all'}
							template={[
								['ponhiro-blocks/image', {}, []],
								['ponhiro-blocks/list', { icon: 'check' }, []],
								['ponhiro-blocks/button', {}, []],
								['ponhiro-blocks/cv-box-note', {}, []],
							]}
						/>
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { colSet, bgStyle } = attributes;
		// const blockClass = blockName;
		return (
			<div className={blockName} data-colset={colSet} data-bg={bgStyle}>
				<div className={`${blockName}__inner`}>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});
