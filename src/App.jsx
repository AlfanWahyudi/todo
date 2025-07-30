import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RegisterPage, { action as registerAction }from './pages/Register'
import LoginPage, { action as loginAction } from './pages/Login'
import DashboardPage from './pages/Dashboard'
import DashboardLayout from './pages/DashboardLayout'
import RootLayout from './pages/RootLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    children: [
      {
        index: true,
        element: <LoginPage />,
        action: loginAction,
      },
      { 
        path: 'register/', 
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: 'dashboard/',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> }
        ]
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
