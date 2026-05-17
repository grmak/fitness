interface SparklineProps {
  /** Valores normalizados (qualquer escala positiva). */
  data: number[];
  /** Cor do traço (classe Tailwind ou hex). */
  strokeClass?: string;
  /** Altura do SVG em pixels. */
  height?: number;
}

/**
 * Mini gráfico de linha para tendência em KPIs.
 *
 * @param props - Série e estilo do sparkline.
 * @returns SVG inline responsivo.
 */
export function Sparkline({ data, strokeClass = "stroke-primary", height = 28 }: SparklineProps): JSX.Element {
  if (data.length < 2) {
    return <svg viewBox="0 0 64 28" className="h-7 w-16" aria-hidden />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 64;
  const h = height;
  const pad = 2;

  const points = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (w - pad * 2);
      const y = h - pad - ((v - min) / range) * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-16 shrink-0" aria-hidden>
      <polyline fill="none" className={strokeClass} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}
