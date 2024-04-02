import { LoginRequestType } from "../requests/login-request.type.ts";
import { RegisterRequestType } from "../requests/register-request.type.ts";

export type AuthContextType = {
  auth: {
    isAuth: boolean;
    user: RegisterRequestType | null;
  };
  login: (data: LoginRequestType, errorAction: () => void) => void;
  logout: () => void;
}