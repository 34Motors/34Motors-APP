import { createCarBody, returnCar } from "@/schemas/carSchemas";
import { z } from "zod";

type ICarsBodyRequest = z.infer<typeof createCarBody>;
type ICarsReturn = z.infer<typeof returnCar>;

interface CarImage {
  id: number;
  imageUrl: string;
}

export type { ICarsBodyRequest, ICarsReturn, CarImage };
