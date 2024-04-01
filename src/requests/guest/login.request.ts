import { api } from "../../api";
import publicEndpointsConstants from "../../constants/endpoints/guest-endpoints.constants.ts";
import { LoginRequestType } from "../../types/requests/login-request.type.ts";
import { LoginResponseType } from "../../types/responses/login-response.type.ts";

export default async function loginRequest(login: LoginRequestType) {
  return api.post<LoginResponseType>(publicEndpointsConstants.login, login)
}