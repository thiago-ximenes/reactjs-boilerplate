import userConfig from "../../config/user.config.ts";

export const getUserService = () => JSON.parse(sessionStorage.getItem(userConfig.userKey) ?? 'null');