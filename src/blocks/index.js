/**
 * 特定のブロックに関するスクリプトではなく、ブロックエディター上で読み込むスクリプト
 */
import { addFilter } from '@wordpress/hooks';

const setPro = (isPro) => {
	return true;
};
// addFilter('pb-hook.isPro', 'pb-blocks-pro', setPro);
