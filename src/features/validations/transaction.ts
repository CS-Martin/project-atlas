import z from 'zod';

export const transactionFormSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z
    .number('Amount is required')
    .positive('Amount must be greater than 0')
    .max(1_000_000_000, 'Amount is too large') // cap at 1B
    .refine((val) => /^\d{1,9}(\.\d{1,2})?$/.test(val.toString()), 'Invalid amount format'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required').max(500, 'Description cannot exceed 500 characters'),
  transactionDate: z
    .string()
    .min(1, 'Date is required')
    .refine((val) => {
      const inputDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // normalize
      return inputDate <= today;
    }, 'Date cannot be in the future'),
  fileUrl: z.string().optional(),
  createdBy: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
