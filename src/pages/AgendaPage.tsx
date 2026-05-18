import { InsightCard } from "../components/InsightCard";
import { OccupancyBar, getOccupancyLevel } from "../components/OccupancyBar";
import { MOCK_SCHEDULE_ITEMS } from "../data/mock";

/**
 * Agenda do dia com ocupação semafórica e insights operacionais.
 *
 * @returns Página de agenda.
 */
export function AgendaPage(): JSX.Element {
  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-gray-100 bg-white/80 px-4 shadow-sm backdrop-blur-md">
        <h1 className="text-lg font-extrabold tracking-tight text-[#2E7D32]">Agenda de hoje</h1>
        <span className="text-xs text-outline">{MOCK_SCHEDULE_ITEMS.length} aulas</span>
      </header>

      <main className="space-y-2 p-4 pb-24">
        <InsightCard
          icon="lightbulb"
          text="2 turmas precisam de atenção: baixa ocupação às 18:00 e lotação máxima às 19:30."
          tone="info"
        />

        {MOCK_SCHEDULE_ITEMS.map((item) => {
          const level = getOccupancyLevel(item.occupancyPct);
          const ringClass =
            level === "full"
              ? "ring-primary/40"
              : level === "low"
                ? "ring-error/40"
                : "ring-secondary-container/40";

          return (
            <article
              key={item.id}
              className={`rounded-lg border border-outline-variant/30 bg-white p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ${ringClass}`}
            >
              <div className="mb-1.5 flex items-start gap-2">
                <span className="shrink-0 pt-0.5 text-[11px] font-bold tabular-nums text-primary">{item.time}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold leading-tight text-on-surface">{item.title}</p>
                  <p className="text-[11px] leading-snug text-outline">
                    {item.coach} • {item.enrolled}/{item.capacity} vagas
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none ${
                    level === "full"
                      ? "bg-green-50 text-primary"
                      : level === "low"
                        ? "bg-red-50 text-error"
                        : "bg-amber-50 text-secondary"
                  }`}
                >
                  {level === "full" ? "Cheio" : level === "low" ? "Baixo" : "Médio"}
                </span>
              </div>
              <OccupancyBar pct={item.occupancyPct} level={level} compact />
              {item.insight && (
                <p className="mt-1 flex items-center gap-1 truncate text-[10px] text-outline">
                  <span className="material-symbols-outlined shrink-0 text-[14px]">info</span>
                  {item.insight}
                </p>
              )}
            </article>
          );
        })}
      </main>
    </>
  );
}
