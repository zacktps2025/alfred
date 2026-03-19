// Alfred — Vercel API Client
// Configurable credentials via ~/.alfred/config.json

import { loadConfig } from "./config.js";
import type { DeploymentInfo } from "../types/tools.js";

function getToken(): string {
  const config = loadConfig();
  if (!config.vercel?.token) throw new Error("Vercel is not configured. Run `alfred-init` to set up.");
  return config.vercel.token;
}

function getProjectName(): string {
  const config = loadConfig();
  return config.vercel?.projectName ?? "my-project";
}

/** List recent deployments */
export async function listDeployments(limit = 5): Promise<DeploymentInfo[]> {
  const token = getToken();
  const projectName = getProjectName();

  const res = await fetch(
    `https://api.vercel.com/v6/deployments?app=${projectName}&limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) {
    throw new Error(`Vercel listDeployments failed (${res.status})`);
  }

  const data = (await res.json()) as {
    deployments: Array<{ url: string; state: string; createdAt: number }>;
  };

  return data.deployments.map((d) => ({
    url: `https://${d.url}`,
    state: d.state,
    created: new Date(d.createdAt).toISOString(),
  }));
}

/** Add a custom domain to the project */
export async function assignDomain(domain: string): Promise<void> {
  const token = getToken();
  const projectName = getProjectName();

  const projectRes = await fetch(`https://api.vercel.com/v9/projects/${projectName}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!projectRes.ok) {
    throw new Error(`Vercel project "${projectName}" not found (${projectRes.status})`);
  }

  const project = (await projectRes.json()) as { id: string };

  const domainRes = await fetch(`https://api.vercel.com/v10/projects/${project.id}/domains`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: domain }),
  });

  if (!domainRes.ok) {
    const err = (await domainRes.json()) as { error?: { message: string } };
    throw new Error(`Failed to assign domain "${domain}": ${err.error?.message ?? domainRes.status}`);
  }
}
