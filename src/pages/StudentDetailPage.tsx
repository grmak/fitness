import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getPresenceTrend,
  getRetentionLabel,
  getStudentById,
  getStudentRecommendations,
} from "../data/mock";

/**
 * Perfil detalhado com score de retenção, tendência e ações contextuais.
 *
 * @returns Página de detalhe ou estado vazio.
 */
export function StudentDetailPage(): JSX.Element {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const student = studentId ? getStudentById(studentId) : undefined;

  if (!student) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-on-surface">Aluno não encontrado.</p>
        <Link to="/alunos" className="text-primary underline">
          Voltar para alunos
        </Link>
      </div>
    );
  }

  const trend = getPresenceTrend(student);
  const recommendations = getStudentRecommendations(student);
  const retentionLabel = getRetentionLabel(student.retentionScore);

  const trendIcon = trend === "up" ? "trending_up" : trend === "down" ? "trending_down" : "trending_flat";
  const trendColor = trend === "up" ? "text-primary" : trend === "down" ? "text-error" : "text-outline";
  const trendShort = trend === "up" ? "Alta" : trend === "down" ? "Queda" : "Estável";

  const btnVariant = {
    primary: "bg-[#25D366] text-white",
    secondary: "border border-outline-variant bg-white text-on-surface",
    danger: "border border-error/20 bg-error-container text-on-error-container",
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-gray-100 bg-white/80 px-4 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate(-1)} className="active:opacity-70" aria-label="Voltar">
            <span className="material-symbols-outlined text-gray-500">arrow_back</span>
          </button>
          <h1 className="max-w-[12rem] truncate text-lg font-extrabold tracking-tight text-[#2E7D32]">{student.name}</h1>
        </div>
      </header>

      <main className="mt-3 space-y-3 px-4 pb-24">
        <section className="rounded-lg bg-gradient-to-br from-primary/10 to-primary-fixed/30 p-3 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <p className="text-[10px] font-label-caps uppercase text-outline">Score de retenção</p>
          <p className="text-3xl font-bold leading-tight text-primary">{student.retentionScore}</p>
          <p className="mt-0.5 text-xs font-semibold text-on-surface">{retentionLabel}</p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/60">
            <div className="h-full rounded-full bg-primary" style={{ width: `${student.retentionScore}%` }} />
          </div>
        </section>

        <section className="grid grid-cols-3 gap-1.5">
          <div className="rounded-lg bg-white p-2 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <p className="text-[9px] font-label-caps uppercase text-outline">Dias sem vir</p>
            <p className={`text-lg font-bold leading-tight ${student.daysSinceVisit >= 7 ? "text-error" : "text-on-surface"}`}>
              {student.daysSinceVisit}
            </p>
          </div>
          <div className="rounded-lg bg-white p-2 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <p className="text-[9px] font-label-caps uppercase text-outline">Faltas seguidas</p>
            <p className={`text-lg font-bold leading-tight ${student.consecutiveAbsences >= 3 ? "text-error" : "text-on-surface"}`}>
              {student.consecutiveAbsences}
            </p>
          </div>
          <div className="rounded-lg bg-white p-2 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <p className="text-[9px] font-label-caps uppercase text-outline">Freq. do mês</p>
            <p className="text-lg font-bold leading-tight text-primary">{student.presenceMonthPct}%</p>
          </div>
        </section>

        <section className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2.5">
            {student.avatarUrl ? (
              <img src={student.avatarUrl} alt="" className="h-11 w-11 shrink-0 rounded-full object-cover" />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-container text-sm font-bold text-outline">
                {student.initials}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-on-surface">{student.name}</h2>
              <p className="text-[11px] text-outline">{student.memberSinceLabel}</p>
              <p className="truncate text-[11px] text-outline">
                {student.modality} • {student.shift} • {student.planName}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border-l-[3px] border-secondary bg-secondary-fixed p-2.5">
          <p className="text-sm font-semibold text-on-secondary-fixed">{student.alertTitle}</p>
          <p className="mt-0.5 text-[11px] leading-snug text-on-secondary-fixed-variant">{student.alertDescription}</p>
        </section>

        <section className="rounded-lg bg-white p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-on-surface">Presença — 4 semanas</h3>
            <span className={`flex shrink-0 items-center gap-0.5 text-[10px] font-bold ${trendColor}`}>
              <span className="material-symbols-outlined text-[16px]">{trendIcon}</span>
              {trendShort}
            </span>
          </div>
          <div className="space-y-2">
            {student.weeklyPresence.map((w, i) => (
              <div key={w.label} className="space-y-0.5">
                <div className="flex justify-between text-[10px]">
                  <span className="font-label-caps text-outline">{w.label}</span>
                  <span className={`font-bold ${w.variant === "tertiary" ? "text-tertiary" : "text-primary"}`}>
                    {w.pct}%
                    {i === 0 && trend === "down" && w.pct < student.weeklyPresence[1]?.pct && (
                      <span className="ml-0.5 text-error">↓</span>
                    )}
                    {i === 0 && trend === "up" && w.pct > (student.weeklyPresence[1]?.pct ?? 0) && (
                      <span className="ml-0.5 text-primary">↑</span>
                    )}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high">
                  <div
                    className={`h-full rounded-full ${w.variant === "tertiary" ? "bg-tertiary" : "bg-primary"}`}
                    style={{ width: `${w.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="px-0.5 text-[10px] font-label-caps uppercase tracking-wide text-outline">
            Recomendações automáticas
          </h3>
          {recommendations.map((rec) => (
            <button
              key={rec.id}
              type="button"
              className={`flex w-full flex-col items-start gap-0.5 rounded-lg p-2.5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.98] ${btnVariant[rec.variant]}`}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold">
                <span className="material-symbols-outlined text-[18px]">{rec.icon}</span>
                {rec.label}
              </span>
              <span className="text-[11px] leading-snug opacity-90">{rec.description}</span>
            </button>
          ))}
        </section>
      </main>
    </>
  );
}
