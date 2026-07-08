/**
 * RICH PRODUCT-LINE CONTENT model. A line either has full `LineContent`
 * (rendered by the spec-forward template) or none (placeholder scaffold).
 * Every fact carries an optional `source` so the page can show the same
 * citation discipline the agents use — numbers trace to a manufacturer doc.
 *
 * Values are authored from the spec data already ingested in the
 * pm-intelligence-agent D1 parameter store (brand = the line). The `source`
 * strings match the D1 `source_doc` values so content and agent cite alike.
 */

export type Sourced = {
  label: string;
  value: string;
  /** Manufacturer source document (matches D1 source_doc). */
  source?: string;
};

/** One row of the models/series comparison table.
 *
 * Acoustic lines (Skyfold, Modernfold) use the typed STC/weight/height fields
 * with the default six-column layout. Non-acoustic lines (Euro-Wall, Smoke
 * Guard, Airolite) instead set `models.columns` and supply free-form `cells`
 * — the same table treatment, columns fit to the line's real data. */
export type ModelRow = {
  series?: string;
  model?: string;
  /** Installed system STC (what the specifier designs to). */
  systemStc?: string;
  /** Lab panel STC (higher; the panel alone). */
  panelStc?: string;
  weight?: string;
  maxHeight?: string;
  note?: string;
  /** Free-form cells, one per `models.columns` header (non-acoustic lines). */
  cells?: string[];
};

export type SpecGroup = {
  title: string;
  facts: Sourced[];
};

export type ChecklistItem = {
  label: string;
  detail: string;
  source?: string;
};

/** A resource is either LINKED to the manufacturer (authoritative, updated) or
 * HOSTED by the dealer (value-add). Enforces the plan's link-vs-host rule. */
export type ResourceItem = {
  label: string;
  kind: "link" | "host";
  note: string;
  href?: string;
};

export type LineContent = {
  /** One-paragraph overview under the hero. */
  overview: string;
  /** Where it fits (bulleted). */
  applications: string[];
  /** Models/series comparison. */
  models: {
    caption: string;
    /** Custom header row for non-acoustic lines. When set, rows render their
     * `cells` under these headers instead of the default acoustic layout
     * (Series / Model / System STC / Panel STC / Weight / Max height). */
    columns?: string[];
    rows: ModelRow[];
  };
  /** Grouped technical data tables (acoustic/structural/electrical/…). */
  technical: SpecGroup[];
  /** GC coordination module — the uniquely-dealer readiness checklist.
   * Present ONLY for sell-and-install lines; sell-only lines omit it. */
  gcReadiness?: {
    intro: string;
    items: ChecklistItem[];
  };
  /** Finishes note (construction/model-dependent constraints). */
  finishes?: string;
  resources: ResourceItem[];
};
