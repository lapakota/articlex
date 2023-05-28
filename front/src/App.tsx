import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
    ArticleEditorRoute,
    ArticleRoute,
    AuthRoute,
    FeedRoute,
    RootRoute,
    UserProfileRoute,
    UserSettingsRoute,
} from './routes';
import { Layout } from './features/Layout';
import { ContextStores } from './contexts';
import { AuthPage } from './features/Auth';
import { UserProfilePageAsync } from './features/Profile';
import { SettingsPageAsync } from './features/Settings';
import { FeedPageAsync } from './features/Feed';
import { ArticlePageAsync, ArticleEditorPageAsync } from './features/Article';

function App() {
    return (
        <BrowserRouter>
            <ContextStores>
                <Routes>
                    <Route path={RootRoute} element={<Layout />}>
                        <Route path={RootRoute} element={<Navigate to={FeedRoute.baseRoute} />} />

                        <Route path={FeedRoute.baseRoute} element={<FeedPageAsync />} />

                        <Route path={ArticleRoute.baseRoute} element={<ArticlePageAsync />} />
                        <Route path={ArticleEditorRoute.baseRoute} element={<ArticleEditorPageAsync />} />

                        <Route path={UserProfileRoute.baseRoute} element={<UserProfilePageAsync />} />
                        <Route path={UserSettingsRoute.baseRoute} element={<SettingsPageAsync />} />
                    </Route>

                    <Route path={AuthRoute.baseRoute} element={<AuthPage />} />

                    <Route path={'*'} element={<>NotFoundPage stub</>} />
                    {/* <Route path={'*'} element={<NotFoundPage />} /> */}
                </Routes>
            </ContextStores>
        </BrowserRouter>
    );
}

export default App;
