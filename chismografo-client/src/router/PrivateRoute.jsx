import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ isAuthenticated, children }) => {
  if (isAuthenticated) {
    return children
  } else {
    return  <Navigate to="/auth/login" replace />
  }
}
