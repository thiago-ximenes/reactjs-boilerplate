import { mock } from "../mock.api.ts";
import authEndpointsConstants from "../../../constants/endpoints/auth-endpoints.constants.ts";
import { ProductListResponse } from "../../../types/responses/product-list-response.type.ts";
import productConfig from "../../../config/product.config.ts";
import { HttpStatusCode } from "axios";

const uri = new RegExp(authEndpointsConstants.productListById.replace(':id', '.*'));
mock.onGet(uri).reply((request) => {
  const id = request.url?.split('/').pop()


  const storageProducts: ProductListResponse | null = JSON.parse(localStorage.getItem(productConfig.productKey) ?? 'null');

  const product = storageProducts?.find((product) => product.id === Number(id));

  if (product) {
    return [HttpStatusCode.Ok, product];
  }

  return [HttpStatusCode.NotFound, { message: 'Product not found' }];
});