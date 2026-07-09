/**
 * TEAM ROSTER — the people shown in the About page "The team" section.
 *
 * EMPTY until real people are provided. The About page renders the section only
 * when this array is non-empty, so the live site never shows placeholder names.
 * To publish, add entries below (name + role required; bio / photo / meta
 * optional) — no other file needs to change. Photos go in `public/team/` and
 * are referenced as `/team/<file>`. Company identity still lives in lib/brand.ts.
 */

export type TeamMember = {
  name: string;
  /** Title / function, e.g. "Founder & Principal", "Field Operations Lead". */
  role: string;
  /** Optional one- or two-sentence bio. */
  bio?: string;
  /** Optional square photo under /public, e.g. "/team/jane-doe.jpg". */
  photo?: string;
  /** Optional secondary line — credentials, or the lines they lead. */
  meta?: string;
};

export const team: TeamMember[] = [];
