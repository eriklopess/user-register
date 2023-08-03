import { z } from "zod";

export const createUserFormSchema = z.object({
    email: z.string().email("O campo email deve ser um email válido").nonempty("O campo email não pode ser vazio"),
    password: z.string().min(6, {
        message: "A senha deve ter no mínimo 6 caracteres"
    }),
    name: z.string().min(3, {
        message: "O nome deve ter no mínimo 3 caracteres"
    }).nonempty("O campo nome não pode ser vazio"),
    birthDate: z.string(),
});

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;