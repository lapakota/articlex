import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoute, RootRoute, UserProfileRoute } from './routes';
import { Layout } from './features/Layout';
import { ContextStores } from './contexts';

function App() {
    return (
        <ContextStores>
            <BrowserRouter>
                <Routes>
                    <Route path={RootRoute} element={<Layout />}>
                        <Route path={RootRoute} element={<Navigate to={UserProfileRoute.baseRoute} />} />
                        <Route path={UserProfileRoute.baseRoute} element={<div>User profile page</div>} />
                        <Route path={AuthRoute.baseRoute} element={<>Auth page</>} />
                    </Route>
                    <Route path={'*'} element={<>NotFoundPage stub</>} />
                    {/* <Route path={'*'} element={<NotFoundPage />} /> */}
                </Routes>
            </BrowserRouter>
        </ContextStores>
    );
}

export default App;
