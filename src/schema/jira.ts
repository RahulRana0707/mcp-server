import { z } from "zod";

export const jiraIssueSchema = z.object({
  issueType: z.string(),
  summary: z.string(),
  description: z
    .string()
    .describe("This will be description in jira markdown format."),
});
