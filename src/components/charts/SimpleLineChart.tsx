interface SimpleLineChartProps {
  /** Rótulos do eixo X. */
  labels: string[];
  /** Valores numéricos da série. */
  values: number[];
  /** Prefixo opcional para tooltip (ex.: R$). */
  valuePrefix?: string;
}

/**
 * Gráfico de linha simples para evolução temporal (receita, frequência).
 *
 * @param props - Labels e valores da série.
 * @returns Bloco SVG com área e pontos.
 */
export function SimpleLineChart({ labels, values, valuePrefix = "" }: SimpleLineChartProps): JSX.Element {
  const w = 320;
  const h = 120;
  const padX = 8;
  const padY = 12;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const coords = values.map((v, i) => {
    const x = padX + (i / Math.max(values.length - 1, 1)) * (w - padX * 2);
    const y = h - padY - ((v - min) / range) * (h - padY * 2);
    return { x, y, v };
  });

  const line = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const area = `${padX},${h - padY} ${line} ${w - padX},${h - padY}`;

  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label="Gráfico de evolução">
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2E7D32" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#chartFill)" />
        <polyline fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={line} />
        {coords.map((c, i) => (
          <circle key={labels[i]} cx={c.x} cy={c.y} r="4" fill="#2E7D32" />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] font-label-caps text-outline">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <p className="sr-only">
        {labels.map((l, i) => `${l}: ${valuePrefix}${values[i]}`).join("; ")}
      </p>
    </figure>
  );
}
