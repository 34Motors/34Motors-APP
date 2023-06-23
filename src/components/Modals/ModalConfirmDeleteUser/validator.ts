import { z } from "zod";

export const confirmPasswordSchema = z.object({
    password: z.string()
})

export type tConfirmPasswordData = z.infer<typeof confirmPasswordSchema>