import { z } from "zod";
import { createAnnouncementSchema } from "../ModalCreateAnnouncement/validator";

export const editAnnouncementSchema = createAnnouncementSchema.partial();

export type iEditAnnouncement = z.infer<typeof editAnnouncementSchema>;
