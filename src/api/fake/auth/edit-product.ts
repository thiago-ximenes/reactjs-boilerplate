import { mock } from "../mock.api.ts";
import authEndpointsConstants from "../../../constants/endpoints/auth-endpoints.constants.ts";
import { ProductListResponse } from "../../../types/responses/product-list-response.type.ts";
import productConfig from "../../../config/product.config.ts";
import { HttpStatusCode } from "axios";

const uri = new RegExp(authEndpointsConstants.productListById.replace(':id', '.*'));
mock.onPut(uri).reply((request) => {
  const id = request.url?.split('/').pop()
  const data = JSON.parse(request.data);


  const storageProducts: ProductListResponse | null = JSON.parse(localStorage.getItem(productConfig.productKey) ?? 'null');

  const product = storageProducts?.find((product) => product.id === Number(id));

  if (product) {
    Object.assign(product, data);
    const productCollection = storageProducts?.map((product) => {
      if (product.id === Number(id)) {
        return data;
      }
      return product;
    });

    localStorage.setItem(productConfig.productKey, JSON.stringify(productCollection));
    return [HttpStatusCode.Accepted];
  }

  return [HttpStatusCode.NotFound, { message: 'Product not found' }];
});