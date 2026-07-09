/**
 * Low-level Cloudflare REST helpers, shared by retrieval (read-only spec data)
 * and guardrails (the dedicated web-agent state DB). Mirrors the pattern proven
 * in pm-intelligence-agent (src/lib/cloudflare.js).
 */

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

/**
 * The three Cloudflare data-tier resources are shared, non-secret IDs (they are
 * checked into .env.example and populated by pm-intelligence-agent). Default
 * them here so only the account ID + API token — the actual credentials — need
 * to be set in the deployment environment. `process.env` still overrides.
 */
export const DB_IDS = {
  params: process.env.D1_PARAMS_DATABASE_ID ?? "18812c7c-0661-4e87-beaa-926b18f13a67",
  knowledge: process.env.D1_KNOWLEDGE_DATABASE_ID ?? "305c2b6e-3c25-4ac1-b9f6-39ad23422c8d",
  webAgent: process.env.WEB_AGENT_D1_DATABASE_ID ?? "e0188046-2ac2-4485-a6d7-fdb35d38d969",
} as const;

/**
 * Whether real Cloudflare credentials are present. The account ID + token are
 * the single gate for all Cloudflare access, so this doubles as the "is the
 * data tier configured for real" signal that the dev-bypass branches key on.
 */
export function isCloudflareConfigured(): boolean {
  return Boolean(ACCOUNT_ID && API_TOKEN);
}

function assertConfigured(): void {
  if (!ACCOUNT_ID || !API_TOKEN) {
    throw new Error(
      "CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN must be set (see .env.example)",
    );
  }
}

export async function cfFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  assertConfigured();
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}${path}`,
    {
      ...options,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    },
  );
  const json = (await res.json()) as {
    success: boolean;
    errors?: unknown;
    result: T;
  };
  if (!json.success) {
    throw new Error(`Cloudflare API error: ${JSON.stringify(json.errors)}`);
  }
  return json.result;
}

/** Run a D1 query and return typed result rows. */
export async function d1Query<T>(
  databaseId: string,
  sql: string,
  params: (string | number)[] = [],
): Promise<T[]> {
  const result = await cfFetch<Array<{ results: T[] }>>(
    `/d1/database/${databaseId}/query`,
    { method: "POST", body: JSON.stringify({ sql, params }) },
  );
  return result[0]?.results ?? [];
}
