import { z } from "zod";
import { jiraCreateIssueSchema } from "../../schema/jira.js";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { JiraClient } from "../../services/jira-client.js";

export const createIssue = async (
  args: z.infer<typeof jiraCreateIssueSchema>,
  extra: RequestHandlerExtra
): Promise<CallToolResult> => {
  try {
    const jiraClient = new JiraClient();
    const issuesData = await jiraClient.createIssue(args);
    return {
      content: [
        {
          type: "text",
          text: `This are the issues available in JIRA for status ${
            args.issueType
          }. Data is in stringify format: ${JSON.stringify(issuesData)}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
    };
  }
};
