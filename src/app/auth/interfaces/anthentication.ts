export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  allow_ip: string;
  created_at: string;
  update_at: string;
  deleted_at: string;
}

export interface Login {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginAndRegisterResponse {
  message: string;
  user: User;
}

export interface Register {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ForgotPassword {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  token: string;
}

export interface ResetPassword {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordResponse {
  message: string;
  resetStatus: string;
}

export interface IsLoggedInResponse {
  status: boolean;
  user: User;
}

export interface MessageResponse {
  message: string;
}
