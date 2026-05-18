export type OccupancyLevel = "low" | "medium" | "full";

interface OccupancyBarProps {
  /** Percentual de 0 a 100. */
  pct: number;
  /** Nível derivado ou explícito. */
  level?: OccupancyLevel;
  showLabel?: boolean;
  /** Versão reduzida para listas compactas. */
  compact?: boolean;
}

/**
 * Retorna o nível de ocupação a partir do percentual.
 *
 * @param pct - Ocupação de 0 a 100.
 * @returns Nível visual (baixo, médio, cheio).
 */
export function getOccupancyLevel(pct: number): OccupancyLevel {
  if (pct >= 85) return "full";
  if (pct >= 50) return "medium";
  return "low";
}

const LEVEL_STYLES: Record<OccupancyLevel, { bar: string; text: string; badge: string }> = {
  full: { bar: "bg-[#2E7D32]", text: "text-primary", badge: "bg-green-50 text-primary" },
  medium: { bar: "bg-secondary-container", text: "text-secondary", badge: "bg-amber-50 text-secondary" },
  low: { bar: "bg-error", text: "text-error", badge: "bg-red-50 text-error" },
};

/**
 * Barra de ocupação com cores semafóricas (verde, amarelo, vermelho).
 *
 * @param props - Percentual e opções de exibição.
 * @param props.compact - Reduz altura da barra e tamanho do rótulo.
 * @returns Barra de progresso com rótulo opcional.
 */
export function OccupancyBar({ pct, level, showLabel = true, compact = false }: OccupancyBarProps): JSX.Element {
  const lvl = level ?? getOccupancyLevel(pct);
  const styles = LEVEL_STYLES[lvl];

  return (
    <div>
      {showLabel && (
        <div className={`flex justify-end ${compact ? "mb-0.5" : "mb-1"}`}>
          <span className={`font-bold ${compact ? "text-[10px]" : "text-xs"} ${styles.text}`}>{pct}%</span>
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-gray-100 ${compact ? "h-1.5" : "h-2"}`}>
        <div className={`h-full rounded-full ${styles.bar}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
