import { applyFilters } from '@wordpress/hooks';

// 翻訳用テキストドメイン
export const textDomain = 'useful-blocks';

// ブロックカテゴリー名
export const blockCategory = 'useful-blocks';

// プロ版かどうか
export const isPro = applyFilters( `pb-hook.isPro`, false );
