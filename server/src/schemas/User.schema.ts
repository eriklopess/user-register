import { z } from 'zod';

export const userSchema = z.object({
  photoUrl: z.string(),
  birthDate: z.date(),
  name: z.string().min(3, { message: 'Name must contain at least 3 character(s)' }),
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password must contain at least 6 character(s)' }),
});

type UserDTO = z.infer<typeof userSchema>;
export default UserDTO;
