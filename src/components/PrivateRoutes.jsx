import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ClipLoader } from 'react-spinners';
function PrivateRoutes() {
  const { auth } = useAuth();
  console.log({ auth });

  if (auth === undefined) {
    return <ClipLoader color="#00FFFF" size={150} />;
  }

  return auth ? <Outlet /> : <Navigate to="/user" />;
}

export default PrivateRoutes;

