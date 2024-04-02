import { api } from "../../api";
import authEndpointsConstants from "../../constants/endpoints/auth-endpoints.constants.ts";

export default async function productRequest(id: string) {
  return api.get(authEndpointsConstants.productListById.replace(':id', id))
}