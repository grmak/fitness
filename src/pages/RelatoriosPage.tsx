import { BarChart } from "../components/charts/BarChart";
import { DualLineChart } from "../components/charts/DualLineChart";
import { InsightCard } from "../components/InsightCard";
import {
  MOCK_ENROLLMENT_MONTHS,
  MOCK_FINANCIAL_MONTHS,
  MOCK_GOALS,
  MOCK_MODALITY_SEGMENTS,
  MOCK_REPORT_FINANCIAL,
  MOCK_RETENTION_METRICS,
  formatBRL,
  getAllReportInsights,
  getExpenseSummary,
  getExpensesByCategory,
} from "../data/mock";

/**
 * Relatórios estratégicos: financeiro, despesas, retenção e metas.
 *
 * @returns Página de relatórios.
 */
export function RelatoriosPage(): JSX.Element {
  const expenseSummary = getExpenseSummary();
  const expenseBars = getExpensesByCategory().map((c) => ({
    id: c.categoryId,
    label: c.categoryName.length > 18 ? `${c.categoryName.slice(0, 16)}…` : c.categoryName,
    value: c.amount,
    barClass: c.type === "fixa" ? "bg-secondary-container" : "bg-error/80",
  }));

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

  const lastMonth = MOCK_FINANCIAL_MONTHS[MOCK_FINANCIAL_MONTHS.length - 1];

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center border-b border-gray-100 bg-white/80 px-4 shadow-sm backdrop-blur-md">
        <h1 className="text-lg font-extrabold tracking-tight text-[#2E7D32]">Relatórios</h1>
      </header>

      <main className="space-y-6 p-4 pb-24">
        <section>
          <h2 className="mb-3 text-title-md font-title-md">Resumo financeiro</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-label-caps uppercase text-outline">Receita</p>
              <p className="text-lg font-bold">{MOCK_REPORT_FINANCIAL.revenue.value}</p>
              <p className="text-xs font-bold text-primary">+{MOCK_REPORT_FINANCIAL.revenue.changePct}%</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-label-caps uppercase text-outline">Despesas</p>
              <p className="text-lg font-bold">{MOCK_REPORT_FINANCIAL.expenses.value}</p>
              <p className="text-xs font-bold text-error">+{MOCK_REPORT_FINANCIAL.expenses.changePct}%</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-label-caps uppercase text-outline">Margem líquida</p>
              <p className="text-lg font-bold text-primary">{MOCK_REPORT_FINANCIAL.margin.value}</p>
              <p className="text-xs font-bold text-error">{MOCK_REPORT_FINANCIAL.margin.changePct}%</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-label-caps uppercase text-outline">Ticket médio</p>
              <p className="text-lg font-bold">{MOCK_REPORT_FINANCIAL.ticket.value}</p>
              <p className="text-xs font-bold text-error">{MOCK_REPORT_FINANCIAL.ticket.changePct}%</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-outline">
            Despesas fixas: {expenseSummary.fixedPct}% • variáveis: {expenseSummary.variablePct}%
          </p>
        </section>

        <section className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-1 text-title-md font-title-md">Receita vs despesas</h2>
          <p className="mb-3 text-xs text-outline">Últimos 6 meses</p>
          <DualLineChart
            labels={MOCK_FINANCIAL_MONTHS.map((m) => m.label)}
            series={[
              {
                id: "revenue",
                label: "Receita",
                values: MOCK_FINANCIAL_MONTHS.map((m) => m.revenue),
                strokeColor: "#2E7D32",
                fillColor: "#2E7D32",
              },
              {
                id: "expense",
                label: "Despesas",
                values: MOCK_FINANCIAL_MONTHS.map((m) => m.expense),
                strokeColor: "#ba1a1a",
                fillColor: "#ba1a1a",
              },
            ]}
            valuePrefix="R$ "
          />
          <p className="mt-3 rounded-lg bg-surface-container-low px-3 py-2 text-center text-sm">
            Margem em {lastMonth.label}:{" "}
            <span className="font-bold text-primary">{formatBRL(expenseSummary.margin)}</span>
            <span className="text-outline"> ({expenseSummary.marginPct}%)</span>
          </p>
        </section>

        <section className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-1 text-title-md font-title-md">Despesas por categoria</h2>
          <p className="mb-3 text-xs text-outline">
            Total: {formatBRL(expenseSummary.total)} • maior: {expenseSummary.topCategory}
          </p>
          <BarChart items={expenseBars} valuePrefix="R$ " valueSuffix="" />
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

        <section className="space-y-2">
          <h2 className="text-title-md font-title-md">Insights automáticos</h2>
          {getAllReportInsights().map((i) => (
            <InsightCard key={i.id} icon={i.icon} text={i.text} tone={i.tone} />
          ))}
        </section>

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
