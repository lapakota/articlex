import { lazy } from 'react';

export const FeedPageAsync = lazy(() => import('./FeedPage').then((module) => ({ default: module.FeedPage })));

export { FeedFilters } from './FeedFilters';
