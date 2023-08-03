import { z } from "zod";

export const loginUserFormSchema = z.object({
    email: z.string().email("O campo email deve ser um email válido").nonempty("O campo email não pode ser vazio"),
    password: z.string().min(6, {
        message: "A senha deve ter no mínimo 6 caracteres"
    }).nonempty("O campo senha não pode ser vazio"),
    remember: z.boolean().optional(),
});

export type LoginUserFormData = z.infer<typeof loginUserFormSchema>;