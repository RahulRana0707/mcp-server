import { JIRA } from "../constant/tool-name.js";
import { jiraIssueSchema } from "../schema/jira.js";
import { createIssue } from "../tools/jira/create-issue.js";
export const jiraServerConfig = {
    tools: [
        {
            name: JIRA.CREATE_ISSUE,
            schema: jiraIssueSchema,
            handler: createIssue,
        },
    ],
};
