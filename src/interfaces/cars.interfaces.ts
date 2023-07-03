import { createCarBody, returnCar } from "@/schemas/carSchemas";
import { z } from "zod";

type ICarsBodyRequest = z.infer<typeof createCarBody>;
type ICarsReturn = z.infer<typeof returnCar>;

interface CarImage {
  id: number;
  imageUrl: string;
  carId: number;
}

interface IFilterOption {
  brand?: string[];
  model?: string[];
  color?: string[];
  year?: string[];
  fuelType?: string[];
  price?: {
    max: number;
    min: number;
  };
  quilometers?: {
    max: number;
    min: number;
  };
}

export type { ICarsBodyRequest, ICarsReturn, CarImage, IFilterOption };
