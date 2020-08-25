/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	RichText,
	// InnerBlocks,
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
const blockName = 'pb-list';

const isListEmpty = ( listItems ) => {
	if ( listItems.length === 0 ) {
		return true;
	} else if ( listItems.length === 1 ) {
		const firstProps = listItems[ 0 ].props;
		if ( firstProps.children.length === 0 ) {
			return true;
		}
	}
	return false;
};

registerBlockType( 'ponhiro-blocks/list', {
	title: __( 'Useful List', textDomain ),
	icon: {
		foreground: pbIcon.color,
		src: pbIcon.list,
	},
	keywords: [ 'ponhiro', 'useful-block', 'list' ],
	category: blockCategory,
	supports: { className: false, reusable: false },
	parent: [
		'ponhiro-blocks/cv-box',
		'ponhiro-blocks/compare-box-body-content',
	],

	attributes: {
		listTag: {
			type: 'string',
			default: 'ul',
		},
		icon: {
			type: 'string',
			default: 'dot',
		},
		listItems: {
			type: 'array',
			source: 'children',
			selector: '.pb-list',
		},
		showBorder: {
			type: 'boolean',
			default: false,
		},
	},

	edit: ( props ) => {
		const { className, attributes, setAttributes } = props;
		const { listTag, icon, listItems, showBorder } = attributes;
		let blockClass = classnames( blockName, className );

		blockClass = classnames( blockClass, '-icon-' + icon );

		if ( isListEmpty( listItems ) ) {
			blockClass = classnames( blockClass, 'is-null' );
		}
		if ( showBorder ) {
			blockClass = classnames( blockClass, '-border-on' );
		}

		return (
			<>
				<MyControls { ...props } />
				<RichText
					tagName={ listTag }
					className={ blockClass }
					multiline='li'
					placeholder={ __( 'Text…', textDomain ) }
					value={ listItems }
					onChange={ ( value ) =>
						setAttributes( { listItems: value } )
					}
				/>
			</>
		);
	},

	save: ( { attributes } ) => {
		const { listTag, listItems, icon, showBorder } = attributes;

		// 空の時は何も出力しない
		if ( isListEmpty( listItems ) ) {
			return null;
		}

		let blockClass = classnames( blockName, '-icon-' + icon );

		if ( showBorder ) {
			blockClass = classnames( blockClass, '-border-on' );
		}

		return (
			<RichText.Content
				tagName={ listTag }
				className={ blockClass }
				value={ listItems }
			/>
		);
	},
} );
