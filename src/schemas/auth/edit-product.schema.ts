import { z } from "zod";

export const editProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nome é obrigatório'),
  price: z.string()
    .refine((value) => {
        const onlyNumbers = value.replace(/\D/g, '');
        return Number(onlyNumbers) > 0;
      },
      'Preço deve ser maior que 0'
    ),
  quantity: z.any()
    .refine((value: number | string) => {
        const onlyNumbers = String(value).replace(/\D/g, '');
        return Number(onlyNumbers) > 0;
      },
      'Deve haver pelo menos 1 produto'
    ).transform((value) => Number(String(value).replace(/\D/g, '') || 0))
})