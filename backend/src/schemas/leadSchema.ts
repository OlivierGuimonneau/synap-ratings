import { z } from 'zod';

export const leadSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.string().email().max(255),
  company: z.string().min(2).max(120),
  phone: z.string().max(20).optional().or(z.literal('')),
  recaptchaToken: z.string().min(10),
});

export type LeadInput = z.infer<typeof leadSchema>;
