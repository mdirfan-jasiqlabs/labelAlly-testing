import * as z from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(80, { message: 'Name cannot exceed 80 characters.' }),
  
  phone: z
    .string()
    .trim()
    .min(8, { message: 'Phone number must be at least 8 characters.' })
    .max(20, { message: 'Phone number cannot exceed 20 characters.' })
    .regex(/^[+]?[0-9\s\-()]{7,20}$/, { message: 'Please enter a valid phone number.' }),
  
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email address is required.' })
    .email({ message: 'Please enter a valid email address.' })
    .max(120, { message: 'Email address cannot exceed 120 characters.' }),
  
  company: z
    .string()
    .trim()
    .max(120, { message: 'Company name cannot exceed 120 characters.' })
    .optional()
    .or(z.literal('')), // Allows empty string
  
  service: z
    .string()
    .min(1, { message: 'Please select a service interest.' }),
  
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(1500, { message: 'Message cannot exceed 1500 characters.' }),
  
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must agree to the privacy statement to proceed.',
    }),

  // Honeypot field for bot detection: normal users won't fill this in, so its length must be 0
  website: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 0, {
      message: 'Spam detected.',
    }),
});
