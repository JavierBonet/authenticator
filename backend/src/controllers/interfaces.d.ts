export type SignUpRequest = Request<
  any,
  any,
  { fullName: string; email: string; role: string; password: string }
>;

export type SignInRequest = Request<
  any,
  any,
  { email: string; password: string }
>;
