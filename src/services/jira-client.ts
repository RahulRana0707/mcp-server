import { jiraConfig } from "../config/env.js";
import { TJiraCreateIssueSchema } from "../schema/jira.js";
import { convertToADF, getStatusId } from "../tools/jira/utils.js";
import {
  Issue,
  IssueTypeMap,
  JiraIssueResponse,
  JiraProjectResponse,
  JisaCreateIssueResponse,
  PriorityMap,
  Status,
  TJiraADF,
} from "../types/jira/responses.js";

interface JiraIssuePayload {
  fields: {
    project: { key: string };
    summary: string;
    description: TJiraADF;
    issuetype: { id: string };
    [key: string]: any;
  };
}

interface JiraClientInterface {
  getProjects(): Promise<
    {
      key: string;
      name: string;
    }[]
  >;
  getIssuesByStatus(status: string): Promise<any[]>;
}

export class JiraClient implements JiraClientInterface {
  private baseUrl: string;
  private auth: string;

  constructor() {
    this.baseUrl = `${jiraConfig.host}/rest/api/3`;
    this.auth = `Basic ${Buffer.from(
      `${jiraConfig.email}:${jiraConfig.apiToken}`
    ).toString("base64")}`;
  }

  async getProjects(): Promise<{ key: string; name: string }[]> {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", this.auth);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      } as RequestInit;

      const response = await fetch(
        `${this.baseUrl}/project/search?startAt=0&maxResults=50`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`JIRA API Error: ${response.statusText}`);
      }

      const data = (await response.json()) as JiraProjectResponse;

      return data.values.map((project) => ({
        key: project.key,
        name: project.name,
      }));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch JIRA projects: ${error.message}`);
      }
      throw error;
    }
  }

  async getIssuesByStatus(status: Status): Promise<
    {
      key: string;
      summary: string;
      description: string;
      assigneeName: string;
    }[]
  > {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", this.auth);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      } as RequestInit;

      const statusId = getStatusId(status);

      const response = await fetch(
        `${this.baseUrl}/search?jql=project=TC AND 'Sub-Assignee' = 10062 AND status=${statusId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`JIRA API Error: ${response.statusText}`);
      }

      const data = (await response.json()) as JiraIssueResponse;

      return data.issues.map((issue: Issue) => ({
        key: issue.key,
        summary: issue.fields.summary,
        description: issue.fields.description,
        assigneeName: issue?.fields?.assignee?.displayName || "No Assignee",
      }));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch JIRA projects: ${error.message}`);
      }
      throw error;
    }
  }

  async createIssue({
    summary,
    description,
    issueType,
    priority,
  }: TJiraCreateIssueSchema): Promise<JisaCreateIssueResponse> {
    const payload: JiraIssuePayload = {
      fields: {
        project: { key: jiraConfig.projectKey },
        summary,
        description: convertToADF(description),
        issuetype: { id: IssueTypeMap[issueType] },
        customfield_10079: {
          id: "10062",
          name: "Rahul Rana",
        },
        customfield_10020: 70,
        priority: {
          id: PriorityMap[priority],
        },
      },
    };

    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", this.auth);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify(payload),
      } as RequestInit;

      const response = await fetch(`${this.baseUrl}/issue`, requestOptions);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`JIRA API Error: ${JSON.stringify(error)}`);
      }

      const data: JisaCreateIssueResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create JIRA issue: ${error.message}`);
      }
      throw error;
    }
  }
}
