import { ProductEntityType } from "../../types/entity/product-entity.type.ts";
import { api } from "../../api";
import authEndpointsConstants from "../../constants/endpoints/auth-endpoints.constants.ts";

export default function editProductRequest(product: ProductEntityType) {
  return api.put(authEndpointsConstants.productListById.replace(':id', product.id.toString()), product)
}