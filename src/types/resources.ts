// Alfred — Resource Types

export interface IssueResource {
  key: string;
  summary: string;
  status: string;
  assignee: string;
  type: string;
  priority: string;
  updated: string;
  created: string;
  staleDays?: number;
}

export interface TeamWorkloadResource {
  member: string;
  role?: string;
  openIssues: number;
  inProgress: number;
  issueKeys: string[];
}
