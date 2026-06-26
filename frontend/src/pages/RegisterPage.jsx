import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthForm from '../components/AuthForm';
import { clearAuthError, registerUser } from '../redux/authSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isLoading, error } = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      navigate('/reels', { replace: true });
    }
  }, [token, navigate]);

  const handleChange = (event) => {
    setFormValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(registerUser(formValues));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <AuthForm
        title="Create your account"
        subtitle="Join the Skillcase platform and jump straight into the reel feed."
        fields={[
          {
            name: 'name',
            label: 'Full name',
            type: 'text',
            placeholder: 'Your name',
            autoComplete: 'name',
          },
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
            placeholder: 'Create a password',
            autoComplete: 'new-password',
          },
        ]}
        values={formValues}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        submitLabel="Create account"
        footerText="Already have an account?"
        footerLinkText="Log in"
        footerLinkTo="/login"
      />
    </motion.div>
  );
};

export default RegisterPage;
