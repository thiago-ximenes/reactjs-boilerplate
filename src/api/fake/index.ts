import { mock } from "./mock.api.ts";

import './guest/login'
import './guest/register'
import './auth/product-list'

mock.onAny().passThrough()