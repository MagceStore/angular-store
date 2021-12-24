interface Authentication {
  email: string;
  password: string;
  remember: boolean;
}

interface Register {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface ResetPassword {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface isLoggedIn {
  status: boolean;
}

export { Authentication, Register, ResetPassword, isLoggedIn };
