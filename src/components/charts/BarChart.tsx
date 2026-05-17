export interface BarChartItem {
  id: string;
  label: string;
  value: number;
  barClass: string;
}

interface BarChartProps {
  items: BarChartItem[];
  /** Prefixo exibido antes do valor (ex.: R$). */
  valuePrefix?: string;
  /** Sufixo exibido após o valor (ex.: %). */
  valueSuffix?: string;
}

/**
 * Gráfico de barras horizontais para comparações simples.
 *
 * @param props - Itens e sufixo opcional.
 * @returns Lista de barras proporcionais.
 */
export function BarChart({ items, valuePrefix = "", valueSuffix = "" }: BarChartProps): JSX.Element {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="space-y-3" role="img" aria-label="Gráfico de barras">
      {items.map((item) => (
        <div key={item.id}>
          <div className="mb-1 flex justify-between text-xs">
            <span className="font-medium text-on-surface">{item.label}</span>
            <span className="font-bold text-outline">
              {valuePrefix}
              {item.value.toLocaleString("pt-BR")}
              {valueSuffix}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div className={`h-full rounded-full ${item.barClass}`} style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
