// Project response interface
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
