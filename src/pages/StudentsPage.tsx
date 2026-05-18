import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DonutChart } from "../components/charts/DonutChart";
import type { PlanType, Student, StudentFilters } from "../data/mock";
import {
  FILTER_MODALITIES,
  FILTER_PLAN_TYPES,
  FILTER_SHIFTS,
  MOCK_STUDENTS,
  filterStudents,
  getRecommendedActionsSummary,
  getRiskDistribution,
} from "../data/mock";

/**
 * Cartão compacto de aluno na lista segmentada por risco.
 *
 * @param props - Propriedades do cartão.
 * @param props.student - Dados do aluno.
 * @returns Linha com resumo do aluno e atalho para o detalhe.
 */
function StudentListCard({ student }: { student: Student }): JSX.Element {
  const isHighRisk = student.risk === "alto";

  return (
    <div
      className={`flex items-center gap-2.5 rounded-lg border bg-surface-container-lowest p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
        isHighRisk ? "border-error/40 bg-error-container/5" : "border-transparent"
      }`}
    >
      {student.avatarUrl ? (
        <img src={student.avatarUrl} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
      ) : (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
          <span className="material-symbols-outlined text-[18px] text-outline">person</span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1">
          <h3 className="truncate text-sm font-semibold leading-tight text-on-surface">{student.name}</h3>
          <span
            className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold leading-none ${
              isHighRisk
                ? "bg-error text-white"
                : student.risk === "atencao"
                  ? "bg-secondary-fixed text-on-secondary-fixed"
                  : "bg-primary-fixed text-on-primary-fixed-variant"
            }`}
          >
            {student.retentionScore}
          </span>
        </div>
        <p className="truncate text-[11px] leading-snug text-gray-500">
          {student.modality} • {student.shift}
        </p>
        <div className="mt-0.5 flex flex-wrap gap-1">
          <span className="rounded bg-surface-container px-1 py-px text-[9px] font-bold text-outline">
            {student.daysSinceVisit}d sem vir
          </span>
          {student.consecutiveAbsences > 0 && (
            <span className="rounded bg-error-container px-1 py-px text-[9px] font-bold text-error">
              {student.consecutiveAbsences} faltas
            </span>
          )}
        </div>
      </div>
      <Link
        to={`/alunos/${student.id}`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary active:scale-95"
        aria-label={`Ver detalhes de ${student.name}`}
      >
        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
      </Link>
    </div>
  );
}

/**
 * Lista de alunos com segmentação, filtros e distribuição de risco.
 *
 * @returns Página de alunos.
 */
export function StudentsPage(): JSX.Element {
  const [minDays, setMinDays] = useState<number | "">("");
  const [modality, setModality] = useState("");
  const [planType, setPlanType] = useState<PlanType | "">("");
  const [shift, setShift] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filters: StudentFilters = useMemo(
    () => ({
      minDaysSinceVisit: minDays === "" ? undefined : minDays,
      modality: modality || undefined,
      planType: planType || undefined,
      shift: shift || undefined,
    }),
    [minDays, modality, planType, shift],
  );

  const students = useMemo(() => filterStudents(filters), [filters]);
  const riskSegments = getRiskDistribution();

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-gray-100 bg-white/80 px-4 shadow-sm backdrop-blur-md">
        <h1 className="text-lg font-extrabold tracking-tight text-[#2E7D32]">Alunos</h1>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className={`rounded-full p-2 transition-colors ${showFilters ? "bg-green-50 text-primary" : "hover:bg-gray-50"}`}
          aria-label="Filtrar"
          aria-expanded={showFilters}
        >
          <span className="material-symbols-outlined text-gray-500">filter_list</span>
        </button>
      </header>

      <main className="space-y-lg px-safe-area-margin pb-24 pt-4">
        <div className="rounded-xl border-l-4 border-error bg-error-container/30 p-sm">
          <div className="mb-xs flex items-center gap-xs">
            <span className="material-symbols-outlined text-[20px] text-error">warning</span>
            <span className="font-label-caps text-label-caps text-error">AÇÕES RECOMENDADAS</span>
          </div>
          <p className="text-body-reg text-on-error-container">{getRecommendedActionsSummary()}</p>
        </div>

        <section className="rounded-xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <h2 className="mb-3 text-title-md font-title-md">Distribuição por risco</h2>
          <DonutChart segments={riskSegments} centerLabel="Total" centerValue={String(MOCK_STUDENTS.length)} />
        </section>

        {showFilters && (
          <section className="space-y-3 rounded-xl border border-outline-variant/30 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-on-surface">Filtros inteligentes</h3>
            <label className="block text-xs text-outline">
              Dias sem comparecer (mín.)
              <select
                className="mt-1 w-full rounded-lg border border-outline-variant/50 p-2 text-sm"
                value={minDays}
                onChange={(e) => setMinDays(e.target.value === "" ? "" : Number(e.target.value))}
              >
                <option value="">Qualquer</option>
                <option value="3">3+ dias</option>
                <option value="5">5+ dias</option>
                <option value="7">7+ dias</option>
              </select>
            </label>
            <label className="block text-xs text-outline">
              Modalidade
              <select
                className="mt-1 w-full rounded-lg border border-outline-variant/50 p-2 text-sm"
                value={modality}
                onChange={(e) => setModality(e.target.value)}
              >
                <option value="">Todas</option>
                {FILTER_MODALITIES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs text-outline">
              Tipo de plano
              <select
                className="mt-1 w-full rounded-lg border border-outline-variant/50 p-2 text-sm"
                value={planType}
                onChange={(e) => setPlanType(e.target.value as PlanType | "")}
              >
                <option value="">Todos</option>
                {FILTER_PLAN_TYPES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs text-outline">
              Turno
              <select
                className="mt-1 w-full rounded-lg border border-outline-variant/50 p-2 text-sm"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
              >
                <option value="">Todos</option>
                {FILTER_SHIFTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </section>
        )}

        <section>
          <h2 className="mb-sm text-title-md font-title-md">
            Lista priorizada ({students.length})
          </h2>
          <div className="flex flex-col gap-2">
            {students.map((s) => (
              <StudentListCard key={s.id} student={s} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
