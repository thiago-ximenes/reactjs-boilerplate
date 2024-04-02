import { RegisterRequestType } from "../requests/register-request.type.ts";

export type LoginResponseType = {
  token: string
  user: RegisterRequestType
}