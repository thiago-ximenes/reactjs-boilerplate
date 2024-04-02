import { api } from "../../api";
import { ProductListResponse } from "../../types/responses/product-list-response.type.ts";
import authEndpointsConstants from "../../constants/endpoints/auth-endpoints.constants.ts";

export default async function productListRequest() {
  return api.get<ProductListResponse>(authEndpointsConstants.productList)
}