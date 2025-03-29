// Project response interface

export interface TJiraADF {
  version: 1;
  type: "doc";
  content: any[];
}

export interface IJiraProject {
  id: string;
  key: string;
  name: string;
  avatarUrls: Record<string, string>;
  projectTypeKey?: string;
  simplified?: boolean;
  style?: string;
  isPrivate?: boolean;
}

export interface JiraProjectResponse {
  values: IJiraProject[];
}

export interface Assignee extends Record<string, any> {
  displayName: string;
}

export interface Fields extends Record<string, any> {
  summary: string;
  description: string;
  assignee: Assignee;
}

export interface Issue extends Record<string, any> {
  key: string;
  fields: Fields;
}

export interface JiraIssueResponse {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: Issue[];
}

export interface JisaCreateIssueResponse {
  id: string;
  key: string;
  self: string;
}

export enum StatusIDMap {
  "To Do" = "10015",
  "In Progress" = "3",
  Blocked = "10027",
  "Merge Request" = "10025",
  Testing = "10026",
  "QA Approval" = "10050",
  Done = "10016",
}

export enum PriorityMap {
  Medium = "3",
  High = "2",
  Highest = "1",
  Low = "4",
}

export enum IssueTypeMap {
  Bug = "10020",
  Task = "10018",
  Story = "10015",
}

export type Status = keyof typeof StatusIDMap;
export type Priority = keyof typeof PriorityMap;
