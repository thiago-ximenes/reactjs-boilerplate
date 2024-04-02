import { mock } from "../mock.api.ts";
import authEndpointsConstants from "../../../constants/endpoints/auth-endpoints.constants.ts";
import { ProductListResponse } from "../../../types/responses/product-list-response.type.ts";
import { HttpStatusCode } from "axios";
import productConfig from "../../../config/product.config.ts";

const productList: ProductListResponse = Array.from({ length: 12 }, (_, id) => ({
  name: `Product ${id + 1}`,
  price: 100 + id * 10,
  quantity: 10 + id,
  id: id + 1,
}));

mock.onGet(authEndpointsConstants.productList).reply(() => {
  const storageProducts: ProductListResponse | null = JSON.parse(localStorage.getItem(productConfig.productKey) ?? 'null');

  if (storageProducts) {
    return [HttpStatusCode.Ok, storageProducts];
  }

  localStorage.setItem(productConfig.productKey, JSON.stringify(productList));

  return [HttpStatusCode.Ok, productList]
});