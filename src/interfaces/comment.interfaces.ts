import { commentSchema } from "@/schemas/commentSchema";
import { DeepPartial } from "react-hook-form";
import { z } from "zod";

type commentReturn = z.infer<typeof commentSchema>
type editComment = DeepPartial<commentReturn>

export type { commentReturn, editComment };
