import type {
  LineContent,
  ModelRow,
  SpecGroup,
  ResourceItem,
} from "@/lib/content/types";

/**
 * Rich content sections for the spec-forward product-line template. Each renders
 * real, sourced spec data with the "technical instrument" treatment: monospace
 * values, hairline tables, and a citation tag on every fact (the same evidence
 * discipline the catalog agents follow). Server components — no interactivity.
 */

/** A small drawing-tag-style citation chip. */
export function SourceTag({ source }: { source?: string }) {
  if (!source) return null;
  return (
    <span
      title={source}
      className="ml-2 inline-block max-w-[16rem] truncate align-middle font-mono text-[10px] text-ink-muted"
    >
      ↳ {source}
    </span>
  );
}

export function Applications({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((a, i) => (
        <li key={i} className="flex gap-3 text-lg leading-relaxed text-ink">
          <span className="mt-1 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
          <span>{a}</span>
        </li>
      ))}
    </ul>
  );
}

export function ModelsTable({ models }: { models: LineContent["models"] }) {
  return (
    <div>
      <div className="overflow-x-auto border border-hairline">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-hairline bg-surface">
              {["Series", "Model", "System STC", "Panel STC", "Weight", "Max height"].map((h) => (
                <th key={h} className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {models.rows.map((r: ModelRow, i) => (
              <tr key={i} className="border-b border-hairline last:border-b-0">
                <td className="px-3 py-2.5 text-sm text-ink-muted">{r.series}</td>
                <td className="px-3 py-2.5 font-mono text-sm text-ink">{r.model}</td>
                <td className="px-3 py-2.5 font-mono text-sm text-ink">{r.systemStc ?? "—"}</td>
                <td className="px-3 py-2.5 font-mono text-sm text-ink-muted">{r.panelStc ?? "—"}</td>
                <td className="px-3 py-2.5 font-mono text-sm text-ink-muted">{r.weight ?? "—"}</td>
                <td className="px-3 py-2.5 font-mono text-sm text-ink-muted">
                  {r.maxHeight ?? "—"}
                  {r.note && (
                    <span className="mt-0.5 block font-sans text-[11px] italic text-ink-muted">{r.note}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-ink-muted">{models.caption}</p>
    </div>
  );
}

export function TechnicalData({ groups }: { groups: SpecGroup[] }) {
  return (
    <div className="grid gap-px border border-hairline bg-hairline md:grid-cols-2">
      {groups.map((g) => (
        <div key={g.title} className="bg-canvas p-6">
          <h3 className="font-mono text-[11px] uppercase tracking-wide text-accent">{g.title}</h3>
          <dl className="mt-4 space-y-3">
            {g.facts.map((f, i) => (
              <div key={i} className="border-b border-hairline pb-3 last:border-b-0 last:pb-0">
                <dt className="text-sm text-ink-muted">{f.label}</dt>
                <dd className="mt-0.5 font-mono text-sm text-ink">
                  {f.value}
                  <SourceTag source={f.source} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

export function GcReadinessModule({
  data,
}: {
  data: NonNullable<LineContent["gcReadiness"]>;
}) {
  return (
    <div className="border border-accent">
      <div className="border-b border-hairline bg-surface px-6 py-3">
        <span className="font-mono text-[11px] uppercase tracking-wide text-accent">
          What the GC must provide
        </span>
      </div>
      <div className="px-6 py-6">
        <p className="max-w-2xl text-ink-muted">{data.intro}</p>
        <ul className="mt-6 divide-y divide-hairline border-t border-hairline">
          {data.items.map((it, i) => (
            <li key={i} className="flex gap-4 py-4">
              <span className="mt-0.5 font-mono text-xs text-accent">☐</span>
              <div>
                <p className="font-mono text-sm text-ink">{it.label}</p>
                <p className="mt-1 text-sm text-ink-muted">
                  {it.detail}
                  <SourceTag source={it.source} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ResourceList({ items }: { items: ResourceItem[] }) {
  return (
    <ul className="divide-y divide-hairline border border-hairline">
      {items.map((r, i) => {
        const Wrapper = r.href ? "a" : "div";
        return (
          <li key={i}>
            <Wrapper
              {...(r.href ? { href: r.href, target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`flex items-start justify-between gap-4 px-5 py-4 ${
                r.href ? "hover:bg-surface" : ""
              }`}
            >
              <div>
                <p className="text-ink">
                  {r.label}
                  {r.href && <span className="ml-1 text-accent">↗</span>}
                </p>
                <p className="mt-0.5 text-sm text-ink-muted">{r.note}</p>
              </div>
              <span
                className={`shrink-0 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                  r.kind === "link"
                    ? "border-hairline text-ink-muted"
                    : "border-accent text-accent"
                }`}
              >
                {r.kind === "link" ? "Manufacturer" : "Dealer"}
              </span>
            </Wrapper>
          </li>
        );
      })}
    </ul>
  );
}
