import { z } from "zod";
import { JIRA } from "../constant/tool-name.js";
import {
  jiraCreateIssueSchema,
  jiraGetIssueByStatusSchema,
} from "../schema/jira.js";
import {
  createIssue,
  getIssueByStatus,
  getListOfProjects,
} from "../tools/jira/index.js";
import { BaseServerConfig } from "../types/server.js";

export const jiraServerConfig: BaseServerConfig = {
  tools: [
    {
      name: JIRA.CREATE_ISSUE,
      schema: jiraCreateIssueSchema,
      handler: createIssue,
    },
    {
      name: JIRA.GET_LIST_OF_PROJECTS,
      schema: z.object({}),
      handler: getListOfProjects,
    },
    {
      name: JIRA.GET_ISSUE_BY_STATUS,
      schema: jiraGetIssueByStatusSchema,
      handler: getIssueByStatus,
    },
  ],
};
