import { lazy } from 'react';

export { ArticleCard } from './ArticleCard';

export const ArticlePageAsync = lazy(() => import('./ArticlePage').then((module) => ({ default: module.ArticlePage })));

export const ArticleEditorPageAsync = lazy(() =>
    import('./ArticleEditorPage').then((module) => ({ default: module.ArticleEditorPage })),
);
