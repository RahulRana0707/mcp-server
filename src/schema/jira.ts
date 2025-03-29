import { z } from "zod";
import {
  IssueTypeMap,
  PriorityMap,
  StatusIDMap,
} from "../types/jira/responses.js";

export const jiraCreateIssueSchema = z.object({
  issueType: z.enum(Object.keys(IssueTypeMap) as [keyof typeof IssueTypeMap]),

  summary: z.string().min(1, "Summary cannot be empty."),

  description: z
    .string()
    .min(1, "Description cannot be empty.")
    .describe("A detailed description of the issue in normal string format."),

  priority: z.enum(Object.keys(PriorityMap) as [keyof typeof PriorityMap]),
});

export const jiraGetIssueByStatusSchema = z.object({
  status: z.enum(Object.keys(StatusIDMap) as [keyof typeof StatusIDMap]),
});

export type TJiraCreateIssueSchema = z.infer<typeof jiraCreateIssueSchema>;
export type TJiraGetIssueByStatusSchema = z.infer<
  typeof jiraGetIssueByStatusSchema
>;
