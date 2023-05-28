import { lazy } from 'react';

export const UserProfilePageAsync = lazy(() =>
    import('./UserProfilePage').then((module) => ({ default: module.UserProfilePage })),
);
