// React main file:
import React from 'react'
import ReactDOM from 'react-dom/client'

// Tailwind CSS:
import './index.css'

// páginas:
import App from './App/App'
import Home from './App/pages/home'
import Login from './App/pages/login'
import Register from './App/pages/register'
import Inventory from './App/pages/inventory'
import AccessManager from './App/pages/accessmanager'

// Router:
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

// functions:
import { checktoken } from './api/requests'


const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Navigate to='/home' />,
    children: [
      {
        path: '/inventory/:id',
        element: await checktoken() ? <Inventory /> : <Navigate to='/login' />,
      },
      {
        path: '/accessmanager/:id',
        element: await checktoken() ? <AccessManager /> : <Navigate to='/login' />,
      },
      {
        path: '/home',
        element: await checktoken() ? <Home /> : <Navigate to='/login' />,
      },
      {
        path: '',
        element: <Navigate to='/home' />,
      }
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  }
]);

// Render:
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
