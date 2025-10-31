import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/Auth/AuthPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import ROUTES from './router/routes'
import ErrorLayoutPage from './layouts/ErrorLayout/ErrorLayout'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <RouterProvider
    router={createBrowserRouter(
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
    )}/>
  )
}
export default App
