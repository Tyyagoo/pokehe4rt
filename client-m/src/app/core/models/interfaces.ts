export interface UserLoginPayload {
  username: string;
  password: string;
}

export interface UserRegisterPayload extends UserLoginPayload {
  email: string;
}

export interface UserActionResponse {
  token?: string;
  message?: string;
}
