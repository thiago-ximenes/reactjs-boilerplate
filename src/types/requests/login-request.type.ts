import { z } from "zod";
import { loginRequestSchema } from "../../schemas/login-request.schema.ts";

export type LoginRequestType = z.infer<typeof loginRequestSchema>;