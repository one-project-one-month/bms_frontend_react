import { useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
}
// get cookie from browser callback
const getToken = () => {
  return Cookies.get('token');
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [token] = useState(getToken);
  //   useEffect(() => {
  //     const token = getToken();
  //     if (token) {
  //       setToken(token);
  //     }
  //   }, []);
  console.log(token, 'Token -');

  return <>{!token ? <Navigate to="/login" replace /> : children}</>;
}
