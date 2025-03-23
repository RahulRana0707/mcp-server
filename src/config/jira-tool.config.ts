import { JIRA } from "../constant/tool-name.js";
import { jiraIssueSchema } from "../schema/jira.js";
import { createIssue } from "../tools/jira/create-issue.js";
import { BaseServerConfig } from "../types/server.js";

export const jiraServerConfig: BaseServerConfig = {
  tools: [
    {
      name: JIRA.CREATE_ISSUE,
      schema: jiraIssueSchema,
      handler: createIssue,
    },
  ],
};
