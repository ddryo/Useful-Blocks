/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { memo } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { formatListBullets, formatListNumbered } from '@wordpress/icons';

/**
 * Custom Component
 */
export default memo(({ listTag, setAttributes }) => {
	return (
		<BlockControls>
			<ToolbarGroup
				controls={[
					{
						icon: formatListBullets,
						title: __('Convert to unordered list'),
						isActive: listTag === 'ul',
						onClick() {
							setAttributes({ listTag: 'ul' });
							setAttributes({ icon: 'check' });
						},
					},
					{
						icon: formatListNumbered,
						title: __('Convert to ordered list'),
						isActive: listTag === 'ol',
						onClick() {
							setAttributes({ listTag: 'ol' });
							setAttributes({ icon: 'circle' });
						},
					},
				]}
			/>
		</BlockControls>
	);
});
