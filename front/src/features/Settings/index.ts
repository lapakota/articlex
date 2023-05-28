import { lazy } from 'react';

export const SettingsPageAsync = lazy(() =>
    import('./SettingsPage').then((module) => ({ default: module.SettingsPage })),
);
