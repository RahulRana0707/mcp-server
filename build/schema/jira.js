import { z } from "zod";
export const jiraIssueSchema = z.object({
    issueType: z.string(),
    summary: z.string(),
    description: z.string(),
});
