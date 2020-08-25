/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RichText, InnerBlocks } from '@wordpress/block-editor';

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
const blockName = 'pb-compare-box';

registerBlockType( 'ponhiro-blocks/compare-box', {
	title: __( 'Comparison box', textDomain ),
	icon: {
		foreground: pbIcon.color,
		src: pbIcon.compareBox,
	},
	keywords: [ 'ponhiro', 'useful-block', 'compare-box' ],
	category: blockCategory,
	supports: { className: false },

	attributes: {
		isLimited: {
			type: 'boolean',
			default: true,
		},
		// listTag: {
		// 	type: 'string',
		// 	default: 'ul',
		// },
		headLeft: {
			type: 'array',
			source: 'children',
			selector: '.pb-compare-box__head__l',
		},
		headRight: {
			type: 'array',
			source: 'children',
			selector: '.pb-compare-box__head__r',
		},
		colSet: {
			type: 'string',
			default: '1',
		},
	},

	edit: ( props ) => {
		const { className, attributes, setAttributes } = props;
		const { headLeft, headRight, colSet } = attributes;
		const blockClass = classnames(
			blockName,
			className,
			'-ponhiro-blocks'
		);

		return (
			<>
				<MyControls { ...props } />
				{ /* カスタムカラーは style={ { '--headColor': '#000' } } で...？ */ }
				<div className={ blockClass } data-colset={ colSet }>
					{ /* ヘッダー部分 */ }
					<div className={ `${ blockName }__head` }>
						<RichText
							tagName='div'
							className={ `${ blockName }__head__l` }
							placeholder={ __( '…', textDomain ) }
							value={ headLeft }
							onChange={ ( value ) =>
								setAttributes( { headLeft: value } )
							}
						/>
						<RichText
							tagName='div'
							className={ `${ blockName }__head__r` }
							placeholder={ __( '…', textDomain ) }
							value={ headRight }
							onChange={ ( value ) =>
								setAttributes( { headRight: value } )
							}
						/>
					</div>
					{ /* <div className={ `${ blockName }__body` }> */ }
					<InnerBlocks
						allowedBlocks={ [ 'ponhiro-blocks/compare-box-body' ] }
						templateLock={ 'insert' }
						template={ [
							[ 'ponhiro-blocks/compare-box-body', {}, [] ],
						] }
					/>
					{ /* </div> */ }
				</div>
			</>
		);
	},

	save: ( { attributes } ) => {
		const { headLeft, headRight, colSet } = attributes;
		const blockClass = classnames( blockName );
		// const blockClass = blockName;
		return (
			<div className={ blockClass } data-colset={ colSet }>
				{ /* ヘッダー部分 */ }
				<div className={ `${ blockName }__head` }>
					<div className={ `${ blockName }__head__l` }>
						{ headLeft }
					</div>
					<div className={ `${ blockName }__head__r` }>
						{ headRight }
					</div>
				</div>
				{ /* <div className={ `${ blockName }__body` }> */ }
				<InnerBlocks.Content />
				{ /* </div> */ }
			</div>
		);
	},
} );

/**
 * Block : pb-compare-box-body
 */
registerBlockType( 'ponhiro-blocks/compare-box-body', {
	title: __( 'Comparison area', textDomain ),
	icon: 'admin-site',
	keywords: [ 'ponhiro', 'compare-box' ],
	category: blockCategory,
	supports: {
		className: false,
		customClassName: false,
		multiple: false,
		reusable: false,
		html: false,
	},
	parent: [ 'ponhiro-blocks/compare-box' ],
	// attributes: {},

	edit: () => {
		return (
			<>
				<div className={ `${ blockName }__body` }>
					<InnerBlocks
						allowedBlocks={ [
							'ponhiro-blocks/compare-box-body-content',
						] }
						templateLock={ 'insert' }
						template={ [
							[
								'ponhiro-blocks/compare-box-body-content',
								{ position: 'l' },
							],
							[
								'ponhiro-blocks/compare-box-body-content',
								{ position: 'r' },
							],
						] }
					/>
				</div>
			</>
		);
	},

	save: () => {
		return (
			<div className={ `${ blockName }__body` }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

/**
 * Block
 */
registerBlockType( 'ponhiro-blocks/compare-box-body-content', {
	title: __( 'Comparison content', textDomain ),
	icon: 'admin-site',
	// keywords: [ 'ponhiro', 'compare-box-body' ],
	category: blockCategory,
	supports: {
		className: false,
		customClassName: false,
		multiple: false,
		reusable: false,
		html: false,
	},
	parent: [ 'ponhiro-blocks/compare-box-body' ],
	attributes: {
		isLimited: {
			type: 'boolean',
			default: true,
		},
		position: {
			type: 'string',
			default: 'l',
		},
	},

	edit: ( props ) => {
		const { className, attributes, setAttributes } = props;
		const { isLimited, position } = attributes;

		const templateLock = isLimited ? 'insert' : false;
		return (
			<>
				<div className={ `${ blockName }__body__${ position }` }>
					<InnerBlocks
						templateLock={ templateLock }
						template={ [ [ 'ponhiro-blocks/list', {} ] ] }
					/>
				</div>
			</>
		);
	},

	save: ( { attributes } ) => {
		const { position } = attributes;
		// const blockClass = blockName;
		return (
			<div className={ `${ blockName }__body__${ position }` }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
