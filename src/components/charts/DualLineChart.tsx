export interface LineSeries {
  id: string;
  label: string;
  values: number[];
  strokeColor: string;
  fillColor?: string;
}

interface DualLineChartProps {
  /** Rótulos do eixo X. */
  labels: string[];
  /** Séries (ex.: receita e despesa). */
  series: LineSeries[];
  /** Prefixo nos valores acessíveis (ex.: R$). */
  valuePrefix?: string;
}

/**
 * Gráfico de linha com duas séries (receita vs despesa).
 *
 * @param props - Labels e séries com cores distintas.
 * @returns SVG com legenda.
 */
export function DualLineChart({ labels, series, valuePrefix = "" }: DualLineChartProps): JSX.Element {
  const w = 320;
  const h = 130;
  const padX = 8;
  const padY = 14;

  const allValues = series.flatMap((s) => s.values);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;

  const toCoords = (values: number[]) =>
    values.map((v, i) => {
      const x = padX + (i / Math.max(values.length - 1, 1)) * (w - padX * 2);
      const y = h - padY - ((v - min) / range) * (h - padY * 2);
      return { x, y, v };
    });

  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label="Receita e despesas">
        {series.map((s) => {
          const coords = toCoords(s.values);
          const line = coords.map((c) => `${c.x},${c.y}`).join(" ");
          const area = `${padX},${h - padY} ${line} ${w - padX},${h - padY}`;
          const fillId = `fill-${s.id}`;
          return (
            <g key={s.id}>
              {s.fillColor && (
                <>
                  <defs>
                    <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={s.fillColor} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={s.fillColor} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon points={area} fill={`url(#${fillId})`} />
                </>
              )}
              <polyline
                fill="none"
                stroke={s.strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={line}
              />
              {coords.map((c, i) => (
                <circle key={`${s.id}-${labels[i]}`} cx={c.x} cy={c.y} r="3.5" fill={s.strokeColor} />
              ))}
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] font-label-caps text-outline">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap justify-center gap-4 text-xs">
        {series.map((s) => (
          <li key={s.id} className="flex items-center gap-1.5">
            <span className="h-2 w-4 rounded-full" style={{ backgroundColor: s.strokeColor }} />
            <span className="text-on-surface">{s.label}</span>
          </li>
        ))}
      </ul>
      <p className="sr-only">
        {series
          .map((s) => labels.map((l, i) => `${s.label} ${l}: ${valuePrefix}${s.values[i]}`).join("; "))
          .join(". ")}
      </p>
    </figure>
  );
}
