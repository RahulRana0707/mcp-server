import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define environment schema
const envSchema = z.object({
  JIRA_HOST: z.string().url("Invalid JIRA host URL"),
  JIRA_EMAIL: z.string().email("Invalid JIRA email"),
  JIRA_API_KEY: z.string().min(1, "JIRA API token is required"),
  JIRA_PROJECT_KEY: z.string().min(1, "JIRA project key is required"),
});

const env = envSchema.parse(process.env);

export const jiraConfig = {
  host: env.JIRA_HOST,
  email: env.JIRA_EMAIL,
  apiToken: env.JIRA_API_KEY,
  projectKey: env.JIRA_PROJECT_KEY,
} as const;
