import authConfig from "../../config/auth.config.ts";

export const hasAuthorizationService = !!sessionStorage.getItem(authConfig.tokenKey);