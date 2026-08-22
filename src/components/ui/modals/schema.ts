import { z } from "zod";

export const entrySchema = z.object({
  project: z.string().min(1, "Select Project is required"),
  typeOfWork: z.string().min(1, "Type of Work is required"),
  description: z
    .string()
    .min(1, "Task description is required")
    .min(5, "Description must be at least 5 characters"),
  hours: z
    .number({ invalid_type_error: "Hours is required" })
    .min(1, "Hours must be at least 1")
    .max(24, "Hours cannot exceed 24"),
});

export type EntryFormData = z.infer<typeof entrySchema>;
