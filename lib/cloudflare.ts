/**
 * Low-level Cloudflare REST helpers, shared by retrieval (read-only spec data)
 * and guardrails (the dedicated web-agent state DB). Mirrors the pattern proven
 * in pm-intelligence-agent (src/lib/cloudflare.js).
 */

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

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
