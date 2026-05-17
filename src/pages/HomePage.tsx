import { Link } from "react-router-dom";
import { Sparkline } from "../components/charts/Sparkline";
import { SimpleLineChart } from "../components/charts/SimpleLineChart";
import { InsightCard } from "../components/InsightCard";
import { OccupancyBar } from "../components/OccupancyBar";
import {
  MOCK_AUTO_INSIGHTS,
  MOCK_BRANDING,
  MOCK_CLASSES_TODAY,
  MOCK_KPIS,
  MOCK_REVENUE_WEEKS,
  getDashboardPriorityStudents,
  getPriorityStudentsCount,
} from "../data/mock";

/**
 * Painel estratégico: KPIs, gráfico principal, ações prioritárias e agenda.
 *
 * @returns Página inicial do proprietário.
 */
export function HomePage(): JSX.Element {
  const priorityStudents = getDashboardPriorityStudents(5);
  const priorityCount = getPriorityStudentsCount();

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
            CF
          </div>
          <h1 className="text-lg font-extrabold tracking-tight text-[#2E7D32]">{MOCK_BRANDING.appName}</h1>
        </div>
        <button type="button" className="relative rounded-full p-2 transition-colors hover:bg-gray-50" aria-label="Notificações">
          <span className="material-symbols-outlined text-gray-500">notifications</span>
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
        </button>
      </header>

      <main className="space-y-6 p-4 pb-24">
        {/* 1. KPIs */}
        <section aria-label="Indicadores principais">
          <div className="grid grid-cols-3 gap-2">
            {MOCK_KPIS.map((kpi) => (
              <div
                key={kpi.id}
                className={`min-w-0 rounded-xl border-l-[3px] bg-white p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${
                  kpi.accent === "success" ? "border-[#2E7D32]" : "border-error"
                }`}
              >
                <p className="text-[10px] font-label-caps uppercase leading-tight text-outline">{kpi.label}</p>
                <p className="mt-0.5 text-base font-bold leading-tight text-on-surface sm:text-xl">{kpi.value}</p>
                <div className="mt-1 flex items-end justify-between gap-1">
                  <span
                    className={`text-[10px] font-bold sm:text-xs ${
                      kpi.trend === "down" ? "text-error" : "text-primary"
                    }`}
                  >
                    {kpi.changePct > 0 ? "+" : ""}
                    {kpi.changePct}% vs ant.
                  </span>
                  <Sparkline
                    data={kpi.sparkline}
                    strokeClass={kpi.trend === "down" ? "stroke-error" : "stroke-primary"}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Gráfico principal */}
        <section className="rounded-xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <h2 className="mb-1 text-title-md font-title-md text-on-surface">Evolução da receita</h2>
          <p className="mb-3 text-xs text-outline">Últimas 6 semanas</p>
          <SimpleLineChart
            labels={MOCK_REVENUE_WEEKS.map((w) => w.label)}
            values={MOCK_REVENUE_WEEKS.map((w) => w.value)}
            valuePrefix="R$ "
          />
        </section>

        {/* Insights automáticos */}
        <section className="space-y-2" aria-label="Insights automáticos">
          <h2 className="text-title-md font-title-md text-on-surface">Insights</h2>
          {MOCK_AUTO_INSIGHTS.map((insight) => (
            <InsightCard key={insight.id} icon={insight.icon} text={insight.text} tone={insight.tone} />
          ))}
        </section>

        {/* 3. Ações prioritárias */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-title-md font-title-md text-on-surface">Alunos que precisam de atenção hoje</h2>
            <Link to="/alunos" className="shrink-0 text-xs font-label-caps text-primary">
              VER TODOS
            </Link>
          </div>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white shadow-md active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            Enviar mensagem para todos ({priorityCount})
          </button>
          <div className="overflow-hidden rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            {priorityStudents.map((s, idx) => (
              <div
                key={s.id}
                className={`flex items-center justify-between p-4 ${
                  idx < priorityStudents.length - 1 ? "border-b border-gray-50" : ""
                } ${s.risk === "alto" ? "bg-error-container/10" : ""}`}
              >
                <Link to={`/alunos/${s.id}`} className="flex min-w-0 flex-1 items-center gap-3">
                  {s.avatarUrl ? (
                    <img src={s.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container font-bold text-outline">
                      {s.initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-[15px] font-title-md text-on-surface">{s.name}</p>
                    <p className="text-xs text-outline">
                      {s.daysSinceVisit}d sem vir • {s.consecutiveAbsences} faltas seguidas
                    </p>
                  </div>
                </Link>
                <Link
                  to={`/alunos/${s.id}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2E7D32] text-white active:scale-95"
                  aria-label={`Contatar ${s.name}`}
                >
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    chat
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Agenda do dia */}
        <section className="space-y-3">
          <h2 className="text-title-md font-title-md text-on-surface">Ocupação dos horários – hoje</h2>
          {MOCK_CLASSES_TODAY.map((c) => (
            <div
              key={c.id}
              className={`rounded-xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${
                c.occupancyPct <= 40 ? "ring-1 ring-error/30" : c.occupancyPct >= 85 ? "ring-1 ring-primary/30" : ""
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-green-50 px-2 py-1 text-xs font-label-caps text-primary">{c.time}</span>
                  <span className="text-[15px] font-title-md">{c.name}</span>
                  {c.occupancyPct <= 40 && (
                    <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-error">VAZIA</span>
                  )}
                  {c.occupancyPct >= 85 && (
                    <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-primary">LOTADA</span>
                  )}
                </div>
              </div>
              <OccupancyBar pct={c.occupancyPct} />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
