import { PropsWithChildren, useCallback, useState } from "react";
import { authContext } from "../context/auth.context.ts";
import { AuthContextType } from "../types/context/auth.context.type.ts";
import { LoginRequestType } from "../types/requests/login-request.type.ts";
import loginRequest from "../requests/guest/login.request.ts";
import { hasAuthorizationService } from "../services/auth/has-authorization.service.ts";
import authConfig from "../config/auth.config.ts";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isAuth, setIsAuth] = useState(hasAuthorizationService);

  const login = useCallback((data: LoginRequestType, errorAction: () => void) => {
    loginRequest(data)
      .then((response) => {
        setIsAuth(true);
        sessionStorage.setItem(authConfig.tokenKey, response.data.token);
      })
      .catch(errorAction)
  }, []);

  const logout = useCallback(() => {
    setIsAuth(false);
    sessionStorage.removeItem(authConfig.tokenKey);
  }, []);

  const value = {
    isAuth,
    login,
    logout,
  } as AuthContextType;
  return <authContext.Provider value={ value }>{ children }</authContext.Provider>
}