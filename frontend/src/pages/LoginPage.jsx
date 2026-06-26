import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthForm from '../components/AuthForm';
import { clearAuthError, loginUser } from '../redux/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, isLoading, error } = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      navigate(location.state?.from?.pathname || '/reels', { replace: true });
    }
  }, [token, navigate, location.state]);

  const handleChange = (event) => {
    setFormValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(loginUser(formValues));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <AuthForm
        title="Welcome back"
        subtitle="Log in to continue browsing the Skillcase reel feed."
        fields={[
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'you@example.com',
            autoComplete: 'email',
          },
          {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            autoComplete: 'current-password',
          },
        ]}
        values={formValues}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        submitLabel="Log in"
        footerText="Need an account?"
        footerLinkText="Create one"
        footerLinkTo="/register"
      />
    </motion.div>
  );
};

export default LoginPage;
