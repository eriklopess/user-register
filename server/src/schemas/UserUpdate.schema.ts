import { z } from 'zod';

export const userUpdateSchema = z.object({
  photoUrl: z.string().optional(),
  birthDate: z.date().optional(),
  name: z.string().min(3, { message: 'Name must contain at least 3 character(s)' }).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6, { message: 'Password must contain at least 6 character(s)' }).optional(),
});

type UserUpdateDTO = z.infer<typeof userUpdateSchema>;
export default UserUpdateDTO;
