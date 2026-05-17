import { BarChart } from "../components/charts/BarChart";
import { SimpleLineChart } from "../components/charts/SimpleLineChart";
import { InsightCard } from "../components/InsightCard";
import {
  MOCK_ENROLLMENT_MONTHS,
  MOCK_GOALS,
  MOCK_MODALITY_SEGMENTS,
  MOCK_REPORT_FINANCIAL,
  MOCK_REPORT_INSIGHTS,
  MOCK_RETENTION_METRICS,
  MOCK_REVENUE_WEEKS,
} from "../data/mock";

/**
 * Relatórios estratégicos: financeiro, retenção, segmentação e metas.
 *
 * @returns Página de relatórios.
 */
export function RelatoriosPage(): JSX.Element {
  const enrollmentBars = MOCK_ENROLLMENT_MONTHS.flatMap((m) => [
    { id: `${m.label}-new`, label: `${m.label} novos`, value: m.newStudents, barClass: "bg-primary" },
    { id: `${m.label}-cancel`, label: `${m.label} cancel.`, value: m.cancellations, barClass: "bg-error" },
  ]);

  const modalityBars = MOCK_MODALITY_SEGMENTS.map((m) => ({
    id: m.id,
    label: m.name,
    value: m.retentionPct,
    barClass: m.alert ? "bg-error" : "bg-primary",
  }));

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center border-b border-gray-100 bg-white/80 px-4 shadow-sm backdrop-blur-md">
        <h1 className="text-lg font-extrabold tracking-tight text-[#2E7D32]">Relatórios</h1>
      </header>

      <main className="space-y-6 p-4 pb-24">
        {/* 1. Resumo financeiro */}
        <section>
          <h2 className="mb-3 text-title-md font-title-md">Resumo financeiro</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-label-caps uppercase text-outline">Receita</p>
              <p className="text-lg font-bold">{MOCK_REPORT_FINANCIAL.revenue.value}</p>
              <p className="text-xs font-bold text-primary">+{MOCK_REPORT_FINANCIAL.revenue.changePct}%</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-label-caps uppercase text-outline">Ticket médio</p>
              <p className="text-lg font-bold">{MOCK_REPORT_FINANCIAL.ticket.value}</p>
              <p className="text-xs font-bold text-error">{MOCK_REPORT_FINANCIAL.ticket.changePct}%</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-label-caps uppercase text-outline">Cancelamentos</p>
              <p className="text-lg font-bold">{MOCK_REPORT_FINANCIAL.cancellations.value}</p>
              <p className="text-xs text-outline">{MOCK_REPORT_FINANCIAL.cancellations.note}</p>
            </div>
          </div>
        </section>

        {/* 2. Gráficos principais */}
        <section className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-title-md font-title-md">Evolução da receita</h2>
          <SimpleLineChart
            labels={MOCK_REVENUE_WEEKS.map((w) => w.label)}
            values={MOCK_REVENUE_WEEKS.map((w) => w.value)}
            valuePrefix="R$ "
          />
        </section>

        <section className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-1 text-title-md font-title-md">Novos vs cancelamentos</h2>
          <p className="mb-3 text-xs text-outline">
            Crescimento líquido último mês: +
            {MOCK_ENROLLMENT_MONTHS[MOCK_ENROLLMENT_MONTHS.length - 1].newStudents -
              MOCK_ENROLLMENT_MONTHS[MOCK_ENROLLMENT_MONTHS.length - 1].cancellations}{" "}
            alunos
          </p>
          <BarChart items={enrollmentBars.slice(-6)} />
        </section>

        {/* 3. Retenção */}
        <section>
          <h2 className="mb-3 text-title-md font-title-md">Retenção</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-label-caps uppercase text-outline">Taxa retenção</p>
              <p className="text-2xl font-bold text-primary">{MOCK_RETENTION_METRICS.retentionRate}%</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-label-caps uppercase text-outline">Em risco</p>
              <p className="text-2xl font-bold text-error">{MOCK_RETENTION_METRICS.atRiskCount}</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-label-caps uppercase text-outline">Perdidos</p>
              <p className="text-2xl font-bold text-on-surface">{MOCK_RETENTION_METRICS.lostInPeriod}</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-label-caps uppercase text-outline">Freq. média</p>
              <p className="text-2xl font-bold text-on-surface">{MOCK_RETENTION_METRICS.avgFrequency}%</p>
            </div>
          </div>
        </section>

        {/* 4. Insights */}
        <section className="space-y-2">
          <h2 className="text-title-md font-title-md">Insights automáticos</h2>
          {MOCK_REPORT_INSIGHTS.map((i) => (
            <InsightCard key={i.id} icon={i.icon} text={i.text} tone={i.tone} />
          ))}
        </section>

        {/* 5. Segmentação */}
        <section className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-title-md font-title-md">Por modalidade</h2>
          <BarChart items={modalityBars} valueSuffix="%" />
          <ul className="mt-3 space-y-1 text-xs text-outline">
            {MOCK_MODALITY_SEGMENTS.filter((m) => m.alert).map((m) => (
              <li key={m.id} className="flex items-center gap-1 text-error">
                <span className="material-symbols-outlined text-sm">warning</span>
                {m.name} → retenção {m.retentionPct}% (alerta)
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Metas */}
        <section>
          <h2 className="mb-3 text-title-md font-title-md">Metas vs realizado</h2>
          <div className="space-y-3">
            {MOCK_GOALS.map((goal) => {
              const pct = Math.min(Math.round((goal.actual / goal.target) * 100), 100);
              const onTrack = pct >= 90;
              return (
                <div key={goal.id} className="rounded-xl bg-white p-4 shadow-sm">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium">{goal.label}</span>
                    <span className={onTrack ? "text-primary" : "text-secondary"}>
                      {goal.actual}
                      {goal.unit} / {goal.target}
                      {goal.unit}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${onTrack ? "bg-primary" : "bg-secondary-container"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
