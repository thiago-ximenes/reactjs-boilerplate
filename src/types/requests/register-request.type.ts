import { z } from "zod";
import { registerRequestSchema } from "../../schemas/register-request.schema.ts";

export type RegisterRequestType = z.infer<typeof registerRequestSchema>;