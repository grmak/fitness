export interface DonutSegment {
  id: string;
  label: string;
  value: number;
  strokeClass: string;
  dotClass: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  centerLabel?: string;
  centerValue?: string;
}

/**
 * Gráfico donut para distribuição (ex.: risco dos alunos).
 *
 * @param props - Segmentos e rótulo central.
 * @returns SVG donut com legenda.
 */
export function DonutChart({ segments, centerLabel, centerValue }: DonutChartProps): JSX.Element {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = 36;
  const c = 2 * Math.PI * r;
  let offset = 0;

  const arcs = segments.map((seg) => {
    const pct = seg.value / total;
    const dash = pct * c;
    const gap = c - dash;
    const arc = {
      ...seg,
      strokeDasharray: `${dash} ${gap}`,
      strokeDashoffset: -offset,
      pct: Math.round(pct * 100),
    };
    offset += dash;
    return arc;
  });

  return (
    <figure className="flex items-center gap-4">
      <div className="relative h-24 w-24 shrink-0">
        <svg viewBox="0 0 88 88" className="h-24 w-24 -rotate-90" aria-hidden>
          <circle cx="44" cy="44" r={r} fill="none" stroke="#e8e8e8" strokeWidth="10" />
          {arcs.map((a) => (
            <circle
              key={a.id}
              cx="44"
              cy="44"
              r={r}
              fill="none"
              className={a.strokeClass}
              strokeWidth="10"
              strokeDasharray={a.strokeDasharray}
              strokeDashoffset={a.strokeDashoffset}
              strokeLinecap="round"
            />
          ))}
        </svg>
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {centerValue && <span className="text-lg font-bold text-on-surface">{centerValue}</span>}
            {centerLabel && <span className="text-[10px] font-label-caps text-outline">{centerLabel}</span>}
          </div>
        )}
      </div>
      <ul className="flex flex-1 flex-col gap-1.5">
        {arcs.map((a) => (
          <li key={a.id} className="flex items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-1.5 text-on-surface">
              <span className={`h-2 w-2 rounded-full ${a.dotClass}`} />
              {a.label}
            </span>
            <span className="font-bold text-outline">
              {a.value} ({a.pct}%)
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
