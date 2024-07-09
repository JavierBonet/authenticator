import { LoginError, UserLogin } from '../authentication/types';

export const requiredFieldText = 'This field is required';

export function validateField(field: string, value: string, error: LoginError) {
  if (field === 'email') {
    validateEmail(error, value);
  } else if (field === 'password') {
    validatePassword(error, value);
  }
}

export function validateEmail(error: LoginError, email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === '') {
    error.email = requiredFieldText;
  } else if (!emailRegex.test(email)) {
    error.email = 'Invalid email address';
  } else {
    error.email = '';
  }
}

export function validatePassword(error: LoginError, password: string) {
  if (password === '') {
    error.password = requiredFieldText;
  } else {
    error.password = '';
  }
}

export function getNewErrors(error: LoginError, user: UserLogin) {
  const newError = { ...error };

  validateEmail(newError, user.email);
  validatePassword(newError, user.password);

  return newError;
}

export function errorsExist(error: LoginError) {
  return Object.values(error).some((value) => value !== '');
}
