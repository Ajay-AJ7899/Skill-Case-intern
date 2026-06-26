import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { token, isInitialized, isLoading } = useSelector((state) => state.auth);

  if (!isInitialized || isLoading) {
    return <Loader fullscreen label="Loading your feed" />;
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
