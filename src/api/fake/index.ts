import { mock } from "./mock.api.ts";

import './guest/login'
import './guest/register.ts'

mock.onAny().passThrough()