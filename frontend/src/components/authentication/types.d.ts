export interface UserRegister {
  fullName: string;
  email: string;
  role: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface RegisterError {
  fullName: string;
  email: string;
  role: string;
  password: string;
}

export interface LoginError {
  email: string;
  password: string;
}
