import { z } from "zod";

export const registerRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nome é obrigatório'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Sobrenome é obrigatório'),
  email: z
    .string()
    .trim()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .trim()
    .min(1, 'Senha é obrigatória')
});