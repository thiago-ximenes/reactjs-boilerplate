import { RegisterRequestType } from "../../types/requests/register-request.type.ts";
import { api } from "../../api";
import guestEndpointsConstants from "../../constants/endpoints/guest-endpoints.constants.ts";

export default async function registerRequest(data: RegisterRequestType) {
  return api.post(guestEndpointsConstants.register, data)
}