export interface UserLoginPayload {
  username: string;
  password: string;
}

export interface UserRegisterPayload extends UserLoginPayload {
  // email: string;
}

export interface UserLoginResponse {
  data: {
    token: string;
  };
}
export interface UserRegisterResponse {
  message?: string;
}
