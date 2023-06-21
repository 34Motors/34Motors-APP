import { z } from "zod";

const createCarBody = z.object({
  cars: z.object({
    brand: z.string().max(20),
    model: z.string().max(50),
    year: z.string().max(4),
    fuelType: z.enum(["Hibrido", "Flex", "Eletrico"]),
    quilometers: z.number(),
    color: z.string().max(16),
    fipePrice: z.string(),
    price: z.number(),
    description: z.string(),
    frontImage: z.string().max(255),
    user: z
      .object({
        name: z.string(),
      })
      .array(),
    published: z.boolean().default(true),
    userId: z.number(),
  }),
  filteredOptions: z.object({
    brands: z.string().array(),
    colors: z.string().array(),
    fuelTypes: z.string().array(),
    maxPrice: z.number(),
    minPrice: z.number(),
    minQuilometers: z.number(),
    years: z.string().array()
  })
});

const returnCar = createCarBody.extend({
  id: z.number(),
});

export { createCarBody, returnCar };
