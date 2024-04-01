import { LoginRequestType } from "../requests/login-request.type.ts";

export type AuthContextType = {
  isAuth: boolean;
  login: (data: LoginRequestType, errorAction: () => void) => void;
  logout: () => void;
}