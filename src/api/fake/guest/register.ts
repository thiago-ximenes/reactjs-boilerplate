import { mock } from "../mock.api.ts";
import { HttpStatusCode } from "axios";
import guestEndpointsConstants from "../../../constants/endpoints/guest-endpoints.constants.ts";
import userConfig from "../../../config/user.config.ts";
import { RegisterRequestType } from "../../../types/requests/register-request.type.ts";

mock.onPost(guestEndpointsConstants.register).reply((request) => {
  const oldData = localStorage.getItem(userConfig.allUsersKey)
  const data = JSON.parse(request.data) as RegisterRequestType

  if (!oldData) {
    localStorage.setItem(userConfig.allUsersKey, JSON.stringify([data]))

    return [HttpStatusCode.Created]
  }

  const parsedData = JSON.parse(oldData) as Array<RegisterRequestType>

  const userAlreadyExists = parsedData.some(user => user.email === data.email)

  if (userAlreadyExists) {
    return [HttpStatusCode.Conflict]
  }

  parsedData.push(data)

  localStorage.setItem(userConfig.allUsersKey, JSON.stringify(parsedData))

  return [HttpStatusCode.Created]
})