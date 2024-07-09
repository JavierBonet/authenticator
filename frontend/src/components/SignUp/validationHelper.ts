import { RegisterError, UserRegister } from '../authentication/types';

export const requiredFieldText = 'This field is required';

export function validateField(
  field: string,
  value: string,
  error: RegisterError
) {
  if (value === '') {
    // @ts-ignore
    error[field] = requiredFieldText;
  } else {
    // @ts-ignore
    error[field] = '';
  }
}

export function validateEmail(error: RegisterError, email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === '') {
    error.email = requiredFieldText;
  } else if (!emailRegex.test(email)) {
    error.email = 'Invalid email address';
  }
}

export function validateName(error: RegisterError, fullName: string) {
  if (fullName === '') {
    error.fullName = requiredFieldText;
  }
}

export function validateRole(error: RegisterError, role: string) {
  if (role === '') {
    error.role = requiredFieldText;
  }
}

export function validatePassword(
  field: string,
  value: string,
  error: RegisterError,
  user: UserRegister
) {
  if (field === 'password' || field === 'passwordConfirmation') {
    if (
      (field === 'password' && value !== user.passwordConfirmation) ||
      (field === 'passwordConfirmation' && value !== user.password)
    ) {
      error['password'] = 'Passwords do not match';
    } else if (field === 'password' && value === '') {
      error['password'] = requiredFieldText;
    } else {
      error['password'] = '';
    }
  }
}

export function getNewErrors(error: RegisterError, user: UserRegister) {
  const newError = { ...error };

  validateEmail(newError, user.email);
  validateName(newError, user.fullName);
  validateRole(newError, user.role);
  validatePassword('password', user.password, newError, user);

  return newError;
}

export function errorsExist(error: RegisterError) {
  return Object.values(error).some((value) => value !== '');
}
