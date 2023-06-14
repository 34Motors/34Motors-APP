import { createCarBody, returnCar } from "@/schemas/carSchemas";
import { z } from "zod";

type ICarsBodyRequest = z.infer<typeof createCarBody>;
type ICarsReturn = z.infer<typeof returnCar>

export type { ICarsBodyRequest, ICarsReturn };
