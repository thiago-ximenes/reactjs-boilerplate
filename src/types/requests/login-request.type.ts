import { z } from "zod";
import { loginRequestSchema } from "../../schemas/guest/login-request.schema.ts";

export type LoginRequestType = z.infer<typeof loginRequestSchema>;