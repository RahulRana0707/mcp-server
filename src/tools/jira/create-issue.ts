import { z } from "zod";
import { jiraIssueSchema } from "../../schema/jira.js";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const createIssue = async (
  args: z.infer<typeof jiraIssueSchema>,
  extra: RequestHandlerExtra
): Promise<CallToolResult> => {
  return {
    content: [
      {
        type: "text",
        text: `Issue created: ${args.summary}`,
      },
    ],
  };
};
