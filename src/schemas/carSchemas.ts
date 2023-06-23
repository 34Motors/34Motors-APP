import { z } from "zod";

const createCarBody = z.object({
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
  images: z
    .object({
      id: z.number(),
      imageUrl: z.string(),
      carId: z.number(),
    })
    .array(),
  published: z.boolean().default(true),
  userId: z.number(),
});

const returnCar = createCarBody.extend({
  id: z.number(),
  user: z.object({ id: z.number(), name: z.string() }),
});

export { createCarBody, returnCar };
