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

  const trendLabel =
    trend === "up" ? "Tendência em alta" : trend === "down" ? "Tendência em queda" : "Tendência estável";
  const trendIcon = trend === "up" ? "trending_up" : trend === "down" ? "trending_down" : "trending_flat";
  const trendColor = trend === "up" ? "text-primary" : trend === "down" ? "text-error" : "text-outline";

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

      <main className="mt-md space-y-md px-safe-area-margin pb-24">
        {/* Score de retenção */}
        <section className="rounded-xl bg-gradient-to-br from-primary/10 to-primary-fixed/30 p-4 text-center shadow-sm">
          <p className="text-label-caps font-label-caps text-outline">Score de retenção</p>
          <p className="text-5xl font-bold text-primary">{student.retentionScore}</p>
          <p className="mt-1 text-sm font-semibold text-on-surface">{retentionLabel}</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/60">
            <div className="h-full rounded-full bg-primary" style={{ width: `${student.retentionScore}%` }} />
          </div>
        </section>

        {/* Informações críticas */}
        <section className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white p-3 text-center shadow-sm">
            <p className="text-[10px] font-label-caps uppercase text-outline">Dias sem vir</p>
            <p className={`text-2xl font-bold ${student.daysSinceVisit >= 7 ? "text-error" : "text-on-surface"}`}>
              {student.daysSinceVisit}
            </p>
          </div>
          <div className="rounded-xl bg-white p-3 text-center shadow-sm">
            <p className="text-[10px] font-label-caps uppercase text-outline">Faltas seguidas</p>
            <p className={`text-2xl font-bold ${student.consecutiveAbsences >= 3 ? "text-error" : "text-on-surface"}`}>
              {student.consecutiveAbsences}
            </p>
          </div>
          <div className="rounded-xl bg-white p-3 text-center shadow-sm">
            <p className="text-[10px] font-label-caps uppercase text-outline">Freq. do mês</p>
            <p className="text-2xl font-bold text-primary">{student.presenceMonthPct}%</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-sm shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="mb-sm flex items-center gap-md">
            {student.avatarUrl ? (
              <img src={student.avatarUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container text-xl font-bold text-outline">
                {student.initials}
              </div>
            )}
            <div>
              <h2 className="font-title-md text-title-md">{student.name}</h2>
              <p className="text-body-reg text-outline">{student.memberSinceLabel}</p>
              <p className="text-xs text-outline">
                {student.modality} • {student.shift} • {student.planName}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border-l-4 border-secondary bg-secondary-fixed p-sm">
          <p className="font-title-md text-title-md text-on-secondary-fixed">{student.alertTitle}</p>
          <p className="mt-1 text-body-reg text-on-secondary-fixed-variant">{student.alertDescription}</p>
        </section>

        {/* Presença com tendência */}
        <section className="rounded-xl bg-white p-sm shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="mb-md flex items-center justify-between">
            <h3 className="font-title-md text-title-md">Presença últimas 4 semanas</h3>
            <span className={`flex items-center gap-1 text-xs font-bold ${trendColor}`}>
              <span className="material-symbols-outlined text-base">{trendIcon}</span>
              {trendLabel}
            </span>
          </div>
          <div className="space-y-sm">
            {student.weeklyPresence.map((w, i) => (
              <div key={w.label} className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-label-caps text-label-caps text-outline">{w.label}</span>
                  <span className={`font-label-caps text-label-caps ${w.variant === "tertiary" ? "text-tertiary" : "text-primary"}`}>
                    {w.pct}%
                    {i === 0 && trend === "down" && w.pct < student.weeklyPresence[1]?.pct && (
                      <span className="ml-1 text-error">↓</span>
                    )}
                    {i === 0 && trend === "up" && w.pct > (student.weeklyPresence[1]?.pct ?? 0) && (
                      <span className="ml-1 text-primary">↑</span>
                    )}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-surface-container-high">
                  <div
                    className={`h-full rounded-full ${w.variant === "tertiary" ? "bg-tertiary" : "bg-primary"}`}
                    style={{ width: `${w.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recomendações */}
        <section className="space-y-sm">
          <h3 className="px-1 font-label-caps text-label-caps uppercase tracking-widest text-outline">
            Recomendações automáticas
          </h3>
          {recommendations.map((rec) => (
            <button
              key={rec.id}
              type="button"
              className={`flex w-full flex-col items-start gap-1 rounded-xl p-4 text-left shadow-sm active:scale-[0.98] ${btnVariant[rec.variant]}`}
            >
              <span className="flex items-center gap-2 font-title-md text-title-md">
                <span className="material-symbols-outlined">{rec.icon}</span>
                {rec.label}
              </span>
              <span className="text-xs opacity-90">{rec.description}</span>
            </button>
          ))}
        </section>
      </main>
    </>
  );
}
