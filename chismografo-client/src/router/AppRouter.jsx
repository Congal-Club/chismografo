import { useContext, useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom'

import { AuthContext } from '../auth/AuthContext'
import { ChatPage } from '../pages/ChatPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {
  const { auth, verificaToken } = useContext(AuthContext)

  useEffect(() => {
    verificaToken()
  }, [verificaToken])

  if (auth.checking) {
    return <h1>Espere por favor</h1>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/login"
          element={<LoginPage />}
        />

        <Route
          path="/auth/register"
          element={<RegisterPage />}
        />

        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={auth.logged}>
              <ChatPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}
