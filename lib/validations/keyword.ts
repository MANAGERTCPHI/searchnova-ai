import { z } from "zod";

export const keywordResearchSchema = z.object({
  query: z.string().trim().min(2, "Enter at least 2 characters.").max(120),
  language: z.string().trim().min(2).max(40).default("English"),
  country: z.string().trim().min(2).max(60).default("Nigeria"),
});

export type KeywordResearchInput = z.infer<typeof keywordResearchSchema>;
