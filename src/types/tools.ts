// Alfred — Tool Response Types

export interface JiraIssue {
  key: string;
  fields: {
    summary: string;
    status: { name: string };
    assignee: { accountId: string; displayName: string } | null;
    updated: string;
    created: string;
    issuetype: { name: string };
    priority: { name: string } | null;
    description?: unknown;
  };
}

export interface SlackMessage {
  user: string;
  text: string;
  ts: string;
  type: string;
}

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  position?: number;
}

export interface DeploymentInfo {
  url: string;
  state: string;
  created: string;
}
