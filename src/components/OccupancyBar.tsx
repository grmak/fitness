export type OccupancyLevel = "low" | "medium" | "full";

interface OccupancyBarProps {
  /** Percentual de 0 a 100. */
  pct: number;
  /** Nível derivado ou explícito. */
  level?: OccupancyLevel;
  showLabel?: boolean;
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
 * @returns Barra de progresso com rótulo opcional.
 */
export function OccupancyBar({ pct, level, showLabel = true }: OccupancyBarProps): JSX.Element {
  const lvl = level ?? getOccupancyLevel(pct);
  const styles = LEVEL_STYLES[lvl];

  return (
    <div>
      {showLabel && (
        <div className="mb-1 flex justify-end">
          <span className={`text-xs font-bold ${styles.text}`}>{pct}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${styles.bar}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
