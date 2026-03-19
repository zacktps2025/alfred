// Alfred — User Configuration Types

export interface AlfredConfig {
  /** Company/agency name */
  companyName: string;
  /** Founder or primary user name */
  founderName: string;
  /** One-line product/service description */
  productDescription?: string;
  /** Primary target customer profile */
  icpPrimary?: string;
  /** Current company stage */
  stage: "idea" | "alpha" | "beta" | "launch" | "growth";

  /** Brand configuration */
  brand: {
    primaryColor: string;
    secondaryColor: string;
    darkColor: string;
    lightColor: string;
    headlineFont: string;
    bodyFont: string;
  };

  /** Jira integration */
  jira?: {
    host: string;
    email: string;
    apiToken: string;
    project: string;
  };

  /** Slack integration */
  slack?: {
    botToken: string;
    defaultChannel?: string;
  };

  /** Serper (web search) integration */
  serper?: {
    apiKey: string;
  };

  /** Vercel integration */
  vercel?: {
    token: string;
    projectName?: string;
  };

  /** Meta Ads integration (v1.1) */
  metaAds?: {
    accessToken: string;
    adAccountId: string;
  };

  /** Google Ads integration (v1.1) */
  googleAds?: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    customerId: string;
  };

  /** Team members */
  team: TeamMember[];
}

export interface TeamMember {
  name: string;
  slackId?: string;
  jiraAccountId?: string;
  role?: string;
}

/** Default configuration — ships with Alfredify design system defaults */
export const DEFAULT_CONFIG: AlfredConfig = {
  companyName: "My Agency",
  founderName: "",
  stage: "alpha",
  brand: {
    primaryColor: "#8535e9",
    secondaryColor: "#6466f0",
    darkColor: "#080a2d",
    lightColor: "#f8f8fc",
    headlineFont: "Kanit",
    bodyFont: "Inter",
  },
  team: [],
};
