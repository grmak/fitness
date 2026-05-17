export type InsightTone = "warning" | "info" | "success" | "danger";

interface InsightCardProps {
  icon: string;
  text: string;
  tone?: InsightTone;
}

const TONE_STYLES: Record<InsightTone, string> = {
  warning: "border-secondary bg-secondary-fixed/40 text-on-secondary-fixed",
  info: "border-primary/30 bg-green-50 text-on-surface",
  success: "border-primary bg-primary-fixed/30 text-on-primary-fixed-variant",
  danger: "border-error bg-error-container/40 text-on-error-container",
};

/**
 * Cartão compacto para insights automáticos do gestor.
 *
 * @param props - Ícone, texto e tom visual.
 * @returns Bloco de insight.
 */
export function InsightCard({ icon, text, tone = "info" }: InsightCardProps): JSX.Element {
  return (
    <div className={`flex items-start gap-2 rounded-lg border-l-4 p-3 text-sm ${TONE_STYLES[tone]}`}>
      <span className="material-symbols-outlined shrink-0 text-[20px]">{icon}</span>
      <p className="leading-snug">{text}</p>
    </div>
  );
}
