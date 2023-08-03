import { z } from "zod";

export const updateUserFormSchema = z.object({
    photoUrl: z.string().optional().nullable(),
    email: z.string().email({
        message: "O campo email deve ser um email válido"
    }).optional().nullable(),
    password: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    birthDate: z.string().optional().nullable(),
});

export type UpdateUserFormData = z.infer<typeof updateUserFormSchema>;