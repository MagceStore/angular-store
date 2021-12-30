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

interface User {
  id?: number;
  username: string;
  email: string;
  created_at?: string;
  update_at?: string;
}

export { Authentication, Register, ResetPassword, isLoggedIn, User };
