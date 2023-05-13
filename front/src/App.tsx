import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoute, FeedRoute, RootRoute, UserProfileRoute, UserSettingsRoute } from './routes';
import { Layout } from './features/Layout';
import { ContextStores } from './contexts';
import { AuthPage } from './features/Auth';
import { UserProfilePage } from './features/Profile';
import { SettingsPage } from './features/Settings';
import { FeedPage } from './features/Feed';

function App() {
    return (
        <BrowserRouter>
            <ContextStores>
                <Routes>
                    <Route path={RootRoute} element={<Layout />}>
                        <Route path={RootRoute} element={<Navigate to={FeedRoute.baseRoute} />} />
                        <Route path={FeedRoute.baseRoute} element={<FeedPage />} />
                        <Route path={UserProfileRoute.baseRoute} element={<UserProfilePage />} />
                        <Route path={UserSettingsRoute.baseRoute} element={<SettingsPage />} />
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
