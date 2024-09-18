const z = require('zod');

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long').regex(passwordValidation, {
    message:
      'Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
  }),
  fullName: z.string(),
  phone: z.string().optional(),
  role: z.enum(['USER', 'OWNER']), 
});

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  fullName: z.string().optional(),
  phone: z.string().optional(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
