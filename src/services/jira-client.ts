import { jiraConfig } from "../config/env.js";
import { getStatusId } from "../tools/jira/utils.js";
import {
  Fields,
  Issue,
  JiraIssueResponse,
  JiraProjectResponse,
  Status,
} from "../types/jira/responses.js";

interface JiraIssuePayload {
  fields: {
    project: { key: string };
    summary: string;
    description: string;
    issuetype: { name: string };
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
        `${this.baseUrl}/search?jql=project=TC AND assignee=harsh.gupta AND 'Sub-Assignee' = 10062 AND status=${statusId}`,
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
        assigneeName: issue.fields.assignee.displayName,
      }));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch JIRA projects: ${error.message}`);
      }
      throw error;
    }
  }

  async createIssue(
    summary: string,
    description: string,
    issueType: string
  ): Promise<string> {
    const payload: JiraIssuePayload = {
      fields: {
        project: { key: jiraConfig.projectKey },
        summary,
        description,
        issuetype: { name: issueType },
      },
    };

    try {
      const response = await fetch(`${this.baseUrl}/issue`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${this.auth}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`JIRA API Error: ${JSON.stringify(error)}`);
      }

      const data = await response.json();
      return data.key;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create JIRA issue: ${error.message}`);
      }
      throw error;
    }
  }
}
