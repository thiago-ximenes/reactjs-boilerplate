import { PropsWithChildren, useCallback, useState } from "react";
import { authContext } from "../context/auth.context.ts";
import { AuthContextType } from "../types/context/auth.context.type.ts";
import { LoginRequestType } from "../types/requests/login-request.type.ts";
import loginRequest from "../requests/guest/login.request.ts";
import { hasAuthorizationService } from "../services/auth/has-authorization.service.ts";
import authConfig from "../config/auth.config.ts";
import userConfig from "../config/user.config.ts";
import { getUserService } from "../services/user/get-user.service.ts";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState<AuthContextType['auth']>({
    isAuth: hasAuthorizationService,
    user: getUserService,
  });

  const login = useCallback((data: LoginRequestType, errorAction: () => void) => {
    loginRequest(data)
      .then((response) => {
        setAuth({
          isAuth: true,
          user: response.data.user,
        });
        sessionStorage.setItem(authConfig.tokenKey, response.data.token);
        sessionStorage.setItem(userConfig.userKey, JSON.stringify(response.data.user));
      })
      .catch(errorAction)
  }, []);

  const logout = useCallback(() => {
    setAuth({
      isAuth: false,
      user: null,
    });
    sessionStorage.removeItem(authConfig.tokenKey);
    sessionStorage.removeItem(userConfig.userKey);
  }, []);

  const value = {
    auth,
    login,
    logout,
  } as AuthContextType;
  return <authContext.Provider value={ value }>{ children }</authContext.Provider>
}