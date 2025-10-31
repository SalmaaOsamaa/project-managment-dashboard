import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'
import ROUTES from './routes'
import { lazy } from 'react'
import ProtectedRoute from './ProtectedRoute'

const AppRouter = () => {
    const ErrorLayoutPage = lazy(() => import('../layouts/ErrorLayout/ErrorLayout'))
    const DashboardPage= lazy(() => import('../pages/Dashboard/DashboardPage'))
    const AuthPage= lazy(() => import('../pages/Auth/AuthPage'))
    return (
        <RouterProvider router={createBrowserRouter(
            createRoutesFromElements(
                <Route>
                    <Route path="/" element={<AuthPage />} />
                    <Route path={ROUTES.ERROR} element={<ErrorLayoutPage />} />
                    <Route 
                        path={ROUTES.DASHBOARD} 
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        } 
                    />
                </Route>
            )
        )} />
    )
}

export default AppRouter