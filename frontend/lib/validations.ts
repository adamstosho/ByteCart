import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const itemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  type: z.enum(["grocery", "medicine"], {
    required_error: "Please select an item type",
  }),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  notes: z.string().optional(),
  imageUrl: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ItemFormData = z.infer<typeof itemSchema>
