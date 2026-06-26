import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchCurrentUser,
  finishInitialization,
  setToken,
} from '../redux/authSlice';

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      dispatch(setToken(storedToken));
      dispatch(fetchCurrentUser());
      return;
    }

    dispatch(finishInitialization());
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
