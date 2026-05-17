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

      <main className="space-y-4 p-4 pb-24">
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
              className={`rounded-xl border border-outline-variant/30 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ${ringClass}`}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-label-caps uppercase text-primary">{item.time}</p>
                  <p className="font-title-md text-on-surface">{item.title}</p>
                  <p className="text-body-reg text-outline">
                    {item.coach} • {item.enrolled}/{item.capacity} vagas
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
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
              <OccupancyBar pct={item.occupancyPct} level={level} />
              {item.insight && (
                <p className="mt-2 flex items-center gap-1 text-xs text-outline">
                  <span className="material-symbols-outlined text-sm">info</span>
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
