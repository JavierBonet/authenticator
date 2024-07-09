import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { LoginError, UserLogin } from './authentication/types';
import ProtectedTextField from './authentication/common/ProtectedTextField';
import AuthenticationApi from '../api/authenticationApi';
import { toast } from 'react-toastify';
import TokenProvider from '../contexts/TokenContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import {
  errorsExist,
  getNewErrors,
  validateField,
} from './SignIn/validationHelper';
import {
  Keys,
  setLocalStorageKey,
} from './authentication/common/utils/localStorage';

const initialUser: UserLogin = {
  email: '',
  password: '',
};

const initialError: LoginError = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState(initialError);
  const { setToken, tokenRef } = useContext(TokenProvider);
  const authenticationApi = new AuthenticationApi(
    setToken,
    () => tokenRef.current
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('redirected')) {
      toast.info('Session expired, please login.');
    }
  }, []);

  const setErrors = (field: string, value: string) => {
    const newError = { ...error };

    validateField(field, value, newError);

    setError(newError);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { id, value },
    } = event;
    setUser({ ...user, [id]: value });
    setErrors(id, value);
  };

  const handleSubmit = async () => {
    if (errorsExist(error)) {
      const newErrors = getNewErrors(error, user);
      setError(newErrors);
      toast.error('Fix errors before login');
      return;
    }

    authenticationApi.login(user).then(({ success, message, accessToken }) => {
      if (success) {
        if (accessToken) {
          setToken(accessToken);
        }
        toast.success(message);
        navigate('/user');
      } else {
        toast.error(message);
      }
    });
  };

  const formStyles: CSSProperties = {
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '10px',
    display: 'flex',
    rowGap: '10px',
  };

  return (
    <>
      <FormControl style={formStyles}>
        <FormLabel htmlFor="email">Email</FormLabel> <br />
        <TextField
          id="email"
          value={user.email}
          error={!!error.email}
          helperText={error.email}
          onChange={handleChange}
        />{' '}
        <br />
        <FormLabel htmlFor="password">Password</FormLabel> <br />
        <ProtectedTextField
          id="password"
          value={user.password}
          error={!!error.password}
          helperText={error.password}
          onChange={handleChange}
        />{' '}
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </FormControl>
    </>
  );
};

export default SignIn;
