import userConfig from "../../config/user.config.ts";

export const getUserService = JSON.parse(localStorage.getItem(userConfig.userKey) ?? 'null');