import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { JiraClient } from "../../services/jira-client.js";

export const getListOfProjects = async (
  args: {},
  extra: RequestHandlerExtra
): Promise<CallToolResult> => {
  try {
    const jiraClient = new JiraClient();
    const projects = await jiraClient.getProjects();
    return {
      content: [
        {
          type: "text",
          text: `This are the projects available in JIRA. Data is in stringify format: ${JSON.stringify(
            projects
          )}`,
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
