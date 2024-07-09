import React, { CSSProperties, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedTextField from './authentication/common/ProtectedTextField';
import AuthenticationApi from '../api/authenticationApi';
import { RegisterError, UserRegister } from './authentication/types';
import { toast } from 'react-toastify';
import TokenProvider from '../contexts/TokenContext';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import {
  errorsExist,
  getNewErrors,
  validateField,
  validatePassword,
} from './SignUp/validationHelper';

export const initialUser: UserRegister = {
  fullName: '',
  email: '',
  role: '',
  password: '',
  passwordConfirmation: '',
};

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
];

const initialError: RegisterError = {
  fullName: '',
  email: '',
  role: '',
  password: '',
};

const SignUp = () => {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState(initialError);
  const { setToken, tokenRef } = useContext(TokenProvider);
  const navigate = useNavigate();

  const authenticationApi = new AuthenticationApi(
    setToken,
    () => tokenRef.current
  );

  const setErrors = (field: string, value: string) => {
    const newError = { ...error };

    validateField(field, value, newError);
    validatePassword(field, value, newError, user);

    setError(newError);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { id, value },
    } = event;
    setUser({ ...user, [id]: value });
    setErrors(id, value);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const {
      target: { name, value },
    } = event;
    setUser({ ...user, [name]: value });
    setErrors(name, value);
  };

  const handleSubmit = async () => {
    if (errorsExist(error)) {
      const newErrors = getNewErrors(error, user);
      setError(newErrors);
      toast.error('Fix errors before submitting');
      return;
    }

    authenticationApi.register(user).then(({ success, message }) => {
      if (success) {
        toast.success(message);
        navigate('/signin');
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
        <FormLabel htmlFor="fullName">Full Name</FormLabel> <br />
        <TextField
          id="fullName"
          value={user.fullName}
          error={!!error.fullName}
          helperText={error.fullName}
          onChange={handleChange}
        />{' '}
        <br />
        <FormLabel htmlFor="email">Email</FormLabel> <br />
        <TextField
          id="email"
          value={user.email}
          error={!!error.email}
          helperText={error.email}
          onChange={handleChange}
        />{' '}
        <br />
        <FormLabel htmlFor="role">Role</FormLabel> <br />
        <Select
          id="role"
          label="Role"
          name="role"
          value={user.role}
          error={!!error.role}
          onChange={handleSelectChange}
        >
          {roleOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error.role && (
          <FormHelperText style={{ color: '#d32f2f' }}>
            {error.role}
          </FormHelperText>
        )}
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
        <FormLabel htmlFor="passwordConfirmation">
          Password Confirmation
        </FormLabel>{' '}
        <br />
        <ProtectedTextField
          id="passwordConfirmation"
          value={user.passwordConfirmation}
          onChange={handleChange}
        />
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Sign up
        </Button>
      </FormControl>
    </>
  );
};

export default SignUp;
