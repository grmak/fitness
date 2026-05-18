import { Link } from "react-router-dom";
import { Sparkline } from "../components/charts/Sparkline";
import { InsightCard } from "../components/InsightCard";
import { OccupancyBar } from "../components/OccupancyBar";
import type { GoalMetric } from "../data/mock";
import {
  MOCK_AUTO_INSIGHTS,
  MOCK_BRANDING,
  MOCK_CLASSES_TODAY,
  MOCK_KPIS,
  MOCK_REPORT_FINANCIAL,
  getDashboardGoals,
  getDashboardPriorityStudents,
  getDaySummary,
  getPriorityStudentsCount,
} from "../data/mock";

/**
 * Barra de progresso de meta mensal.
 *
 * @param props - Meta com valor atual e alvo.
 * @param props.goal - Dados da meta.
 * @returns Barra de progresso compacta.
 */
function GoalProgressRow({ goal }: { goal: GoalMetric }): JSX.Element {
  const pct = Math.min(Math.round((goal.actual / goal.target) * 100), 100);
  const onTrack = pct >= 90;

  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="font-medium text-on-surface">{goal.label}</span>
        <span className={onTrack ? "font-bold text-primary" : "font-bold text-secondary"}>
          {goal.actual}
          {goal.unit} / {goal.target}
          {goal.unit}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full ${onTrack ? "bg-primary" : "bg-secondary-container"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Painel estratégico: KPIs, resumo do dia, metas, ações prioritárias e agenda.
 *
 * @returns Página inicial do proprietário.
 */
export function HomePage(): JSX.Element {
  const priorityStudents = getDashboardPriorityStudents(5);
  const priorityCount = getPriorityStudentsCount();
  const daySummary = getDaySummary();
  const dashboardGoals = getDashboardGoals();

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary">
            <span className="material-symbols-outlined text-[20px]">robot_2</span>
          </div>
          <h1 className="text-lg font-extrabold tracking-tight text-[#2E7D32]">{MOCK_BRANDING.appName}</h1>
        </div>
        <button type="button" className="relative rounded-full p-2 transition-colors hover:bg-gray-50" aria-label="Notificações">
          <span className="material-symbols-outlined text-gray-500">notifications</span>
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
        </button>
      </header>

      <main className="space-y-6 p-4 pb-24">
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

        <section className="rounded-xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]" aria-label="Resumo do dia">
          <h2 className="mb-3 text-title-md font-title-md text-on-surface">Resumo do dia</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-surface-container-low p-2.5">
              <p className="text-[10px] font-label-caps uppercase text-outline">Aulas hoje</p>
              <p className="text-lg font-bold text-on-surface">{daySummary.classesToday}</p>
            </div>
            <div className="rounded-lg bg-surface-container-low p-2.5">
              <p className="text-[10px] font-label-caps uppercase text-outline">Ocupação média</p>
              <p className="text-lg font-bold text-primary">{daySummary.avgOccupancyPct}%</p>
            </div>
            <div className="rounded-lg bg-surface-container-low p-2.5">
              <p className="text-[10px] font-label-caps uppercase text-outline">Turmas críticas</p>
              <p className="text-lg font-bold text-error">{daySummary.criticalClasses}</p>
            </div>
            <div className="rounded-lg bg-surface-container-low p-2.5">
              <p className="text-[10px] font-label-caps uppercase text-outline">Alunos em risco</p>
              <p className="text-lg font-bold text-error">{daySummary.atRiskStudents}</p>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]" aria-label="Metas do mês">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-title-md font-title-md text-on-surface">Metas do mês</h2>
            <Link to="/relatorios" className="shrink-0 text-xs font-label-caps text-primary">
              VER RELATÓRIOS
            </Link>
          </div>
          <div className="space-y-3">
            {dashboardGoals.map((goal) => (
              <GoalProgressRow key={goal.id} goal={goal} />
            ))}
          </div>
          <Link
            to="/relatorios"
            className="mt-3 flex items-center justify-between rounded-lg bg-green-50/80 px-3 py-2.5 text-sm active:scale-[0.99]"
          >
            <span className="text-on-surface">
              Margem do mês: <span className="font-bold text-primary">{MOCK_REPORT_FINANCIAL.margin.value}</span>
            </span>
            <span className="material-symbols-outlined text-primary">chevron_right</span>
          </Link>
        </section>

        <section className="space-y-2" aria-label="Insights automáticos">
          <h2 className="text-title-md font-title-md text-on-surface">Insights</h2>
          {MOCK_AUTO_INSIGHTS.map((insight) => (
            <InsightCard key={insight.id} icon={insight.icon} text={insight.text} tone={insight.tone} />
          ))}
        </section>

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

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-title-md font-title-md text-on-surface">Ocupação dos horários – hoje</h2>
            <Link to="/agenda" className="shrink-0 text-xs font-label-caps text-primary">
              VER AGENDA
            </Link>
          </div>
          {MOCK_CLASSES_TODAY.map((c) => (
            <div
              key={c.id}
              className={`rounded-lg bg-white p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
                c.occupancyPct <= 40 ? "ring-1 ring-error/30" : c.occupancyPct >= 85 ? "ring-1 ring-primary/30" : ""
              }`}
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-label-caps text-primary">{c.time}</span>
                <span className="truncate text-sm font-semibold">{c.name}</span>
                {c.occupancyPct <= 40 && (
                  <span className="rounded bg-red-50 px-1 py-px text-[9px] font-bold text-error">VAZIA</span>
                )}
                {c.occupancyPct >= 85 && (
                  <span className="rounded bg-green-50 px-1 py-px text-[9px] font-bold text-primary">LOTADA</span>
                )}
              </div>
              <OccupancyBar pct={c.occupancyPct} compact />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
