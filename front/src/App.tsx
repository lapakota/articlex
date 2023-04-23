import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoute, RootRoute, UserProfileRoute } from './routes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={RootRoute}>
                    {/* <Route path={RootRoute} element={<Layout />}> */}
                    <Route path={RootRoute} element={<Navigate to={UserProfileRoute.baseRoute} />} />
                    <Route path={UserProfileRoute.baseRoute} element={<>User profile page</>} />
                    <Route path={AuthRoute.baseRoute} element={<>Auth page</>} />
                </Route>
                <Route path={'*'} element={<>NotFoundPage stub</>} />
                {/* <Route path={'*'} element={<NotFoundPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
