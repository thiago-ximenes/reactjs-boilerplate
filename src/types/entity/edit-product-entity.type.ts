import { z } from "zod";
import { editProductSchema } from "../../schemas/auth/edit-product.schema.ts";

export type EditProductEntityType = z.infer<typeof editProductSchema>;