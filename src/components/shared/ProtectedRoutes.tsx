import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoute = () => {
  let allowed = false;
  const user = localStorage.getItem('user');
  if (user) allowed = true;

  return allowed ? <Outlet /> : <Navigate to="/signup" replace />;
};
