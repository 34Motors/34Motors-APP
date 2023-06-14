import { z } from "zod";

export const createAnnouncementSchema = z.object({
  brand: z.string().max(20),
  model: z.string().max(50),
  year: z.string().max(4),
  fuelType: z.enum(["Hibrido", "Flex", "Eletrico"]),
  quilometers: z.string().max(6),
  color: z.string().max(16),
  fipePrice: z.string(),
  price: z.number(),
  description: z.string(),
  frontImage: z.string().max(255),
});

export type iCreateAnnouncement = z.infer<typeof createAnnouncementSchema>;
