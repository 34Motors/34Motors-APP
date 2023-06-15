import { z } from "zod";

export const createAnnouncementSchema = z.object({
  brand: z.string().max(20),
  model: z.string().max(50),
  year: z.string().max(4),
  fuelType: z.enum(["Hibrido", "Flex", "Eletrico"]),
  quilometers: z.string().max(6).min(1),
  color: z.string().max(16).min(1),
  fipePrice: z.string(),
  price: z
    .string()
    .min(1)
    .transform((val) => parseFloat(val)),
  description: z.string().min(1),
  frontImage: z.string().url().max(255),
  images: z.array(z.string().min(1).max(255)),
});

export type iCreateAnnouncement = z.infer<typeof createAnnouncementSchema>;
