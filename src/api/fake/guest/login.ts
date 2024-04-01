import { mock } from "../mock.api.ts";
import { HttpStatusCode } from "axios";
import guestEndpointsConstants from "../../../constants/endpoints/guest-endpoints.constants.ts";
import { LoginRequestType } from "../../../types/requests/login-request.type.ts";
import userConfig from "../../../config/user.config.ts";
import { RegisterRequestType } from "../../../types/requests/register-request.type.ts";

mock.onPost(guestEndpointsConstants.login).reply((request) => {
  const data = JSON.parse(request.data) as LoginRequestType

  const allStorageUsers = (localStorage.getItem(userConfig.userKey))

  const users = allStorageUsers ? JSON.parse(allStorageUsers) : []

  const user = users.find((user: RegisterRequestType) => user.email === data.email && user.password === data.password
  )

  if (!user) {
    return [HttpStatusCode.Unauthorized]
  }

  return [HttpStatusCode.Ok, {
    token: 'token',
    user
  }]
})