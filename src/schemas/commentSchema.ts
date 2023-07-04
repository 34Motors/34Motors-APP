import { z } from "zod";

const commentSchema = z.object({
  id: z.number(),
  description: z.string(),
  postDate: z.date(),
  userId: z.number(),
  carId: z.number(),
  user: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

const editCommentSchema = commentSchema.deepPartial();

export { commentSchema, editCommentSchema };
