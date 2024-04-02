import { mock } from "./mock.api.ts";

import './guest/login'
import './guest/register'
import './auth/product-list'
import './auth/product'
import './auth/edit-product.ts'

mock.onAny().passThrough()