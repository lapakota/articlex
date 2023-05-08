import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoute, FeedRoute, RootRoute, UserProfileRoute } from './routes';
import { Layout } from './features/Layout';
import { ContextStores } from './contexts';
import { AuthPage } from './features/Auth';
import { UserProfilePage } from './features/Profile';

function App() {
    return (
        <BrowserRouter>
            <ContextStores>
                <Routes>
                    <Route path={RootRoute} element={<Layout />}>
                        <Route path={RootRoute} element={<Navigate to={FeedRoute.baseRoute} />} />
                        <Route path={FeedRoute.baseRoute} element={<div>feed here</div>} />
                        <Route path={UserProfileRoute.baseRoute} element={<UserProfilePage />} />
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
