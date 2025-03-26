import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { JiraClient } from "../../services/jira-client.js";
import { Status } from "../../types/jira/responses.js";

export const getIssueByStatus = async (
  args: { status: Status },
  extra: RequestHandlerExtra
): Promise<CallToolResult> => {
  try {
    const jiraClient = new JiraClient();
    const issues = await jiraClient.getIssuesByStatus(args.status);
    return {
      content: [
        {
          type: "text",
          text: `This are the issues available in JIRA for status ${
            args.status
          }. Data is in stringify format: ${JSON.stringify(issues)}`,
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
