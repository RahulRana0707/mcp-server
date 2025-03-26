import { z } from "zod";
import { JIRA } from "../constant/tool-name.js";
import { jiraIssueSchema } from "../schema/jira.js";
import { createIssue } from "../tools/jira/create-issue.js";
import { BaseServerConfig } from "../types/server.js";
import { getListOfProjects } from "../tools/jira/get-list-of-projects.js";
import { getIssueByStatus } from "../tools/jira/get-issue-by-status.js";
import { StatusIDMap } from "../types/jira/responses.js";

export const jiraServerConfig: BaseServerConfig = {
  tools: [
    {
      name: JIRA.CREATE_ISSUE,
      schema: jiraIssueSchema,
      handler: createIssue,
    },
    {
      name: JIRA.GET_LIST_OF_PROJECTS,
      schema: z.object({}),
      handler: getListOfProjects,
    },
    {
      name: JIRA.GET_ISSUE_BY_STATUS,
      schema: z.object({
        status: z.enum(Object.keys(StatusIDMap) as [keyof typeof StatusIDMap]),
      }),
      handler: getIssueByStatus,
    },
  ],
};
