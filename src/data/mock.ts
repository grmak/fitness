/**
 * Tipos e dados mockados da aplicação CopilotFit (sem backend).
 * @module data/mock
 */

/** Nível de risco de retenção exibido na lista de alunos. */
export type RiskLevel = "alto" | "atencao" | "ativo";

/** Tipo de plano para filtros. */
export type PlanType = "Mensal" | "Trimestral" | "Anual";

/** Registro de presença semanal para o gráfico do perfil. */
export interface WeeklyPresence {
  label: string;
  pct: number;
  variant: "primary" | "tertiary";
}

/** Aluno da academia com campos usados na lista e no detalhe. */
export interface Student {
  id: string;
  name: string;
  initials: string;
  avatarUrl: string | null;
  modality: string;
  shift: string;
  planType: PlanType;
  presencePct: number;
  risk: RiskLevel;
  memberSinceLabel: string;
  planName: string;
  lastClassRelative: string;
  startDateLabel: string;
  consecutiveAbsences: number;
  daysSinceVisit: number;
  absencesMonth: number;
  presenceMonthPct: number;
  alertTitle: string;
  alertDescription: string;
  weeklyPresence: WeeklyPresence[];
  /** Score numérico de retenção (0–100). */
  retentionScore: number;
  dashboardSubtitle: string;
}

/** KPI exibido no painel inicial. */
export interface Kpi {
  id: string;
  label: string;
  value: string;
  trend: "up" | "down" | "flat";
  accent: "success" | "danger";
  /** Variação percentual vs período anterior. */
  changePct: number;
  /** Série para sparkline. */
  sparkline: number[];
}

/** Aula do dia com ocupação. */
export interface ClassSlot {
  id: string;
  time: string;
  name: string;
  occupancyPct: number;
  tone: "primary" | "secondary" | "danger";
}

/** Insight automático do dashboard. */
export interface AutoInsight {
  id: string;
  icon: string;
  text: string;
  tone: "warning" | "info" | "success" | "danger";
}

/** Item da agenda com ocupação detalhada. */
export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  coach: string;
  enrolled: number;
  capacity: number;
  occupancyPct: number;
  insight?: string;
}

/** Filtros da lista de alunos. */
export interface StudentFilters {
  minDaysSinceVisit?: number;
  modality?: string;
  planType?: PlanType;
  shift?: string;
}

/** Recomendação contextual no perfil do aluno. */
export interface StudentRecommendation {
  id: string;
  icon: string;
  label: string;
  description: string;
  variant: "primary" | "secondary" | "danger";
}

/** Segmento de modalidade nos relatórios. */
export interface ModalitySegment {
  id: string;
  name: string;
  retentionPct: number;
  alert?: boolean;
}

/** Meta vs realizado. */
export interface GoalMetric {
  id: string;
  label: string;
  target: number;
  actual: number;
  unit: string;
}

/** Ponto da série temporal de receita. */
export interface WeeklyRevenuePoint {
  label: string;
  value: number;
}

/** Tipo de despesa operacional. */
export type ExpenseType = "fixa" | "variavel" | "esporadica";

/** Categoria de despesa do studio. */
export interface ExpenseCategory {
  id: string;
  name: string;
  type: ExpenseType;
}

/** Lançamento de despesa. */
export interface Expense {
  id: string;
  date: string;
  categoryId: string;
  description: string;
  amount: number;
  paid: boolean;
  recurrence?: "mensal" | "unica";
}

/** Ponto mensal com receita e despesa. */
export interface MonthlyFinancialPoint {
  label: string;
  revenue: number;
  expense: number;
}

/** Total de despesa por categoria no período. */
export interface ExpenseCategoryTotal {
  categoryId: string;
  categoryName: string;
  amount: number;
  type: ExpenseType;
}

/** Resumo agregado de despesas do mês. */
export interface ExpenseSummary {
  total: number;
  fixedPct: number;
  variablePct: number;
  topCategory: string;
  margin: number;
  marginPct: number;
}

/** Configuração visual do estúdio (marca). */
export interface StudioBranding {
  appName: string;
  heroImageUrl: string;
  heroTitle: string;
  heroSubtitle: string;
}

/** Imagem de academia para hero e banners. */
const STUDIO_IMAGE =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80";

/** Lista fixa de alunos (fonte única para telas). */
export const MOCK_STUDENTS: Student[] = [
  {
    id: "ricardo-silva",
    name: "Ricardo Silva",
    initials: "R",
    avatarUrl: null,
    modality: "Musculação",
    shift: "Manhã",
    planType: "Mensal",
    presencePct: 25,
    risk: "alto",
    memberSinceLabel: "Aluno desde Jan 2024",
    planName: "Plano Mensal",
    lastClassRelative: "há 10 dias",
    startDateLabel: "10/01/2024",
    consecutiveAbsences: 4,
    daysSinceVisit: 10,
    absencesMonth: 4,
    presenceMonthPct: 25,
    alertTitle: "ALERTA: 4 faltas consecutivas",
    alertDescription: "O aluno está há 10 dias sem comparecer ao estúdio.",
    weeklyPresence: [
      { label: "SEM 04 (ATUAL)", pct: 0, variant: "tertiary" },
      { label: "SEM 03", pct: 0, variant: "tertiary" },
      { label: "SEM 02", pct: 60, variant: "primary" },
      { label: "SEM 01", pct: 100, variant: "primary" },
    ],
    retentionScore: 22,
    dashboardSubtitle: "4 faltas • 10 dias sem vir",
  },
  {
    id: "ana-martins",
    name: "Ana Martins",
    initials: "A",
    avatarUrl: null,
    modality: "Pilates",
    shift: "Tarde",
    planType: "Trimestral",
    presencePct: 40,
    risk: "atencao",
    memberSinceLabel: "Aluno desde Mar 2024",
    planName: "Plano Trimestral",
    lastClassRelative: "há 8 dias",
    startDateLabel: "05/03/2024",
    consecutiveAbsences: 3,
    daysSinceVisit: 8,
    absencesMonth: 3,
    presenceMonthPct: 40,
    alertTitle: "Atenção: frequência em queda",
    alertDescription: "Três faltas seguidas; considere contato proativo.",
    weeklyPresence: [
      { label: "SEM 04 (ATUAL)", pct: 20, variant: "tertiary" },
      { label: "SEM 03", pct: 40, variant: "primary" },
      { label: "SEM 02", pct: 50, variant: "primary" },
      { label: "SEM 01", pct: 80, variant: "primary" },
    ],
    retentionScore: 48,
    dashboardSubtitle: "3 faltas • 8 dias sem vir",
  },
  {
    id: "marcos-oliveira",
    name: "Marcos Oliveira",
    initials: "M",
    avatarUrl: null,
    modality: "Funcional",
    shift: "Noite",
    planType: "Mensal",
    presencePct: 55,
    risk: "atencao",
    memberSinceLabel: "Aluno desde Fev 2024",
    planName: "Plano Mensal",
    lastClassRelative: "há 7 dias",
    startDateLabel: "12/02/2024",
    consecutiveAbsences: 2,
    daysSinceVisit: 7,
    absencesMonth: 2,
    presenceMonthPct: 55,
    alertTitle: "Lembrete de retorno",
    alertDescription: "Última visita há uma semana.",
    weeklyPresence: [
      { label: "SEM 04 (ATUAL)", pct: 30, variant: "tertiary" },
      { label: "SEM 03", pct: 55, variant: "primary" },
      { label: "SEM 02", pct: 70, variant: "primary" },
      { label: "SEM 01", pct: 90, variant: "primary" },
    ],
    retentionScore: 52,
    dashboardSubtitle: "2 faltas • 7 dias sem vir",
  },
  {
    id: "carlos-silva",
    name: "Carlos Silva",
    initials: "C",
    avatarUrl: null,
    modality: "Musculação",
    shift: "Manhã",
    planType: "Anual",
    presencePct: 22,
    risk: "alto",
    memberSinceLabel: "Aluno desde Jan 2023",
    planName: "Plano Anual",
    lastClassRelative: "há 5 dias",
    startDateLabel: "20/01/2023",
    consecutiveAbsences: 2,
    daysSinceVisit: 5,
    absencesMonth: 5,
    presenceMonthPct: 22,
    alertTitle: "Risco elevado de churn",
    alertDescription: "Presença abaixo de 25% nas últimas semanas.",
    weeklyPresence: [
      { label: "SEM 04 (ATUAL)", pct: 22, variant: "tertiary" },
      { label: "SEM 03", pct: 30, variant: "tertiary" },
      { label: "SEM 02", pct: 40, variant: "primary" },
      { label: "SEM 01", pct: 35, variant: "tertiary" },
    ],
    retentionScore: 28,
    dashboardSubtitle: "Presença crítica • contato sugerido",
  },
  {
    id: "mariana-costa",
    name: "Mariana Costa",
    initials: "M",
    avatarUrl: null,
    modality: "Pilates",
    shift: "Tarde",
    planType: "Mensal",
    presencePct: 25,
    risk: "alto",
    memberSinceLabel: "Aluno desde Ago 2024",
    planName: "Plano Mensal",
    lastClassRelative: "há 3 dias",
    startDateLabel: "01/08/2024",
    consecutiveAbsences: 1,
    daysSinceVisit: 3,
    absencesMonth: 4,
    presenceMonthPct: 25,
    alertTitle: "Frequência na zona de alerta",
    alertDescription: "Presença semanal abaixo do esperado para o plano.",
    weeklyPresence: [
      { label: "SEM 04 (ATUAL)", pct: 25, variant: "tertiary" },
      { label: "SEM 03", pct: 35, variant: "tertiary" },
      { label: "SEM 02", pct: 45, variant: "primary" },
      { label: "SEM 01", pct: 50, variant: "primary" },
    ],
    retentionScore: 35,
    dashboardSubtitle: "25% presença • Pilates tarde",
  },
  {
    id: "juliana-mendes",
    name: "Juliana Mendes",
    initials: "J",
    avatarUrl: null,
    modality: "Yoga",
    shift: "Noite",
    planType: "Mensal",
    presencePct: 45,
    risk: "atencao",
    memberSinceLabel: "Aluno desde Mai 2024",
    planName: "Plano Mensal",
    lastClassRelative: "há 2 dias",
    startDateLabel: "10/05/2024",
    consecutiveAbsences: 0,
    daysSinceVisit: 2,
    absencesMonth: 2,
    presenceMonthPct: 45,
    alertTitle: "Manter engajamento",
    alertDescription: "Boa evolução; reforçar horários com baixa lotação.",
    weeklyPresence: [
      { label: "SEM 04 (ATUAL)", pct: 45, variant: "primary" },
      { label: "SEM 03", pct: 50, variant: "primary" },
      { label: "SEM 02", pct: 40, variant: "primary" },
      { label: "SEM 01", pct: 55, variant: "primary" },
    ],
    retentionScore: 58,
    dashboardSubtitle: "Yoga • Noite",
  },
  {
    id: "pedro-almeida",
    name: "Pedro Almeida",
    initials: "P",
    avatarUrl: null,
    modality: "CrossFit",
    shift: "Noite",
    planType: "Mensal",
    presencePct: 60,
    risk: "atencao",
    memberSinceLabel: "Aluno desde Jun 2024",
    planName: "Plano Mensal",
    lastClassRelative: "ontem",
    startDateLabel: "03/06/2024",
    consecutiveAbsences: 0,
    daysSinceVisit: 1,
    absencesMonth: 1,
    presenceMonthPct: 60,
    alertTitle: "Estável",
    alertDescription: "Convide para desafios ou turmas cheias.",
    weeklyPresence: [
      { label: "SEM 04 (ATUAL)", pct: 60, variant: "primary" },
      { label: "SEM 03", pct: 55, variant: "primary" },
      { label: "SEM 02", pct: 65, variant: "primary" },
      { label: "SEM 01", pct: 70, variant: "primary" },
    ],
    retentionScore: 65,
    dashboardSubtitle: "CrossFit • Noite",
  },
  {
    id: "beatriz-souza",
    name: "Beatriz Souza",
    initials: "B",
    avatarUrl: null,
    modality: "Dança",
    shift: "Manhã",
    planType: "Anual",
    presencePct: 95,
    risk: "ativo",
    memberSinceLabel: "Aluno desde Jan 2024",
    planName: "Plano Anual",
    lastClassRelative: "hoje",
    startDateLabel: "08/01/2024",
    consecutiveAbsences: 0,
    daysSinceVisit: 0,
    absencesMonth: 0,
    presenceMonthPct: 95,
    alertTitle: "Aluno em destaque",
    alertDescription: "Excelente frequência; candidata a indicação.",
    weeklyPresence: [
      { label: "SEM 04 (ATUAL)", pct: 95, variant: "primary" },
      { label: "SEM 03", pct: 100, variant: "primary" },
      { label: "SEM 02", pct: 90, variant: "primary" },
      { label: "SEM 01", pct: 100, variant: "primary" },
    ],
    retentionScore: 92,
    dashboardSubtitle: "Dança • Manhã",
  },
];

/** KPIs do painel com tendência e sparklines. */
export const MOCK_KPIS: Kpi[] = [
  {
    id: "revenue",
    label: "Receita",
    value: "R$ 15.4k",
    trend: "up",
    accent: "success",
    changePct: 8.2,
    sparkline: [12, 13, 12.5, 14, 14.5, 15.4],
  },
  {
    id: "active",
    label: "Alunos ativos",
    value: "124",
    trend: "up",
    accent: "success",
    changePct: 3.1,
    sparkline: [118, 119, 120, 121, 122, 124],
  },
  {
    id: "ticket",
    label: "Ticket médio",
    value: "R$ 125",
    trend: "down",
    accent: "danger",
    changePct: -2.4,
    sparkline: [132, 130, 128, 127, 126, 125],
  },
];

/** Evolução da receita (últimas semanas). */
export const MOCK_REVENUE_WEEKS: WeeklyRevenuePoint[] = [
  { label: "S1", value: 13200 },
  { label: "S2", value: 13800 },
  { label: "S3", value: 14100 },
  { label: "S4", value: 14800 },
  { label: "S5", value: 15200 },
  { label: "S6", value: 15400 },
];

/** Insights automáticos do dashboard. */
export const MOCK_AUTO_INSIGHTS: AutoInsight[] = [
  {
    id: "absence-7d",
    icon: "person_off",
    text: "3 alunos não frequentam há mais de 7 dias.",
    tone: "danger",
  },
  {
    id: "low-class",
    icon: "event_busy",
    text: "Turma das 18:30 (Funcional) com baixa ocupação (30%).",
    tone: "warning",
  },
  {
    id: "pilates-ok",
    icon: "trending_up",
    text: "Pilates mantém retenção de 88% — melhor modalidade do mês.",
    tone: "success",
  },
];

/** Aulas de hoje com ocupação mockada. */
export const MOCK_CLASSES_TODAY: ClassSlot[] = [
  { id: "yoga", time: "08:30", name: "Yoga", occupancyPct: 85, tone: "primary" },
  { id: "pilates", time: "10:00", name: "Pilates", occupancyPct: 55, tone: "secondary" },
  { id: "funcional", time: "18:30", name: "Funcional", occupancyPct: 30, tone: "danger" },
];

/** Marca e mídias do app. */
export const MOCK_BRANDING: StudioBranding = {
  appName: "CopilotFit",
  heroImageUrl: STUDIO_IMAGE,
  heroTitle: "Gestão sem esforço",
  heroSubtitle: "Copiloto inteligente para o seu studio fitness.",
};

/** Agenda mock com ocupação e insights. */
export const MOCK_SCHEDULE_ITEMS: ScheduleItem[] = [
  { id: "1", time: "07:00", title: "Musculação — Turma A", coach: "Felipe", enrolled: 12, capacity: 15, occupancyPct: 80 },
  { id: "2", time: "08:30", title: "Yoga", coach: "Luiza", enrolled: 18, capacity: 20, occupancyPct: 90, insight: "Turma quase lotada" },
  { id: "3", time: "10:00", title: "Pilates", coach: "Luiza", enrolled: 8, capacity: 15, occupancyPct: 53, insight: "Ocupação média" },
  { id: "4", time: "18:00", title: "Funcional", coach: "Felipe", enrolled: 6, capacity: 20, occupancyPct: 30, insight: "Turma com baixa ocupação" },
  {
    id: "5",
    time: "19:30",
    title: "CrossFit",
    coach: "Ana",
    enrolled: 14,
    capacity: 14,
    occupancyPct: 100,
    insight: "Turma lotada — possibilidade de abrir vaga extra",
  },
];

/** Categorias de despesa de um pequeno studio fitness. */
export const MOCK_EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: "aluguel", name: "Aluguel", type: "fixa" },
  { id: "salarios", name: "Salários e honorários", type: "fixa" },
  { id: "energia", name: "Energia elétrica", type: "variavel" },
  { id: "agua", name: "Água", type: "variavel" },
  { id: "internet", name: "Internet e telefonia", type: "fixa" },
  { id: "marketing", name: "Marketing", type: "variavel" },
  { id: "manutencao", name: "Manutenção e reparos", type: "variavel" },
  { id: "limpeza", name: "Limpeza e higiene", type: "variavel" },
  { id: "software", name: "Software e assinaturas", type: "fixa" },
  { id: "taxas", name: "Taxas de pagamento", type: "variavel" },
  { id: "contador", name: "Contador e serviços profissionais", type: "fixa" },
  { id: "impostos", name: "Impostos e taxas", type: "fixa" },
];

/** Receita e despesa — últimos 6 meses. */
export const MOCK_FINANCIAL_MONTHS: MonthlyFinancialPoint[] = [
  { label: "Dez", revenue: 42000, expense: 36500 },
  { label: "Jan", revenue: 43500, expense: 37200 },
  { label: "Fev", revenue: 44800, expense: 37800 },
  { label: "Mar", revenue: 46200, expense: 38500 },
  { label: "Abr", revenue: 47100, expense: 39200 },
  { label: "Mai", revenue: 48200, expense: 39800 },
];

/** Despesas do mês corrente (maio) por categoria. */
export const MOCK_EXPENSES_BY_CATEGORY: ExpenseCategoryTotal[] = [
  { categoryId: "salarios", categoryName: "Salários e honorários", amount: 25300, type: "fixa" },
  { categoryId: "aluguel", categoryName: "Aluguel", amount: 5500, type: "fixa" },
  { categoryId: "impostos", categoryName: "Impostos e taxas", amount: 1870, type: "fixa" },
  { categoryId: "taxas", categoryName: "Taxas de pagamento", amount: 1350, type: "variavel" },
  { categoryId: "energia", categoryName: "Energia elétrica", amount: 1350, type: "variavel" },
  { categoryId: "marketing", categoryName: "Marketing", amount: 2000, type: "variavel" },
  { categoryId: "limpeza", categoryName: "Limpeza e higiene", amount: 700, type: "variavel" },
  { categoryId: "software", categoryName: "Software e assinaturas", amount: 550, type: "fixa" },
  { categoryId: "manutencao", categoryName: "Manutenção e reparos", amount: 500, type: "variavel" },
  { categoryId: "contador", categoryName: "Contador e serviços profissionais", amount: 400, type: "fixa" },
  { categoryId: "agua", categoryName: "Água", amount: 300, type: "variavel" },
  { categoryId: "internet", categoryName: "Internet e telefonia", amount: 180, type: "fixa" },
];

/** Lançamentos de despesa (amostra do mês). */
export const MOCK_EXPENSES: Expense[] = [
  {
    id: "e1",
    date: "2025-05-01",
    categoryId: "aluguel",
    description: "Aluguel maio — sala principal",
    amount: 5500,
    paid: true,
    recurrence: "mensal",
  },
  {
    id: "e2",
    date: "2025-05-05",
    categoryId: "salarios",
    description: "Honorários professores (4 modalidades)",
    amount: 9800,
    paid: true,
    recurrence: "mensal",
  },
  {
    id: "e3",
    date: "2025-05-10",
    categoryId: "energia",
    description: "Conta de luz — maio",
    amount: 1350,
    paid: true,
    recurrence: "mensal",
  },
  {
    id: "e4",
    date: "2025-04-18",
    categoryId: "manutencao",
    description: "Revisão esteira e bikes",
    amount: 2000,
    paid: true,
    recurrence: "unica",
  },
];

/** Resumo financeiro dos relatórios. */
export const MOCK_REPORT_FINANCIAL = {
  revenue: { value: "R$ 48.200", changePct: 8 },
  expenses: { value: "R$ 39.800", changePct: 3.2 },
  margin: { value: "R$ 8.400", changePct: -2.1 },
  ticket: { value: "R$ 128", changePct: -1.2 },
  cancellations: { value: "3", note: "1 pendente de retorno" },
};

/** Insights financeiros (despesas e margem). */
export const MOCK_FINANCIAL_INSIGHTS: AutoInsight[] = [
  {
    id: "f1",
    icon: "pie_chart",
    text: "Aluguel + folha representam 68% das despesas do mês.",
    tone: "warning",
  },
  {
    id: "f2",
    icon: "savings",
    text: "Margem líquida de 17,4% — abaixo da meta de 22%.",
    tone: "danger",
  },
  {
    id: "f3",
    icon: "campaign",
    text: "Despesas com marketing subiram 12% vs mês anterior.",
    tone: "warning",
  },
  {
    id: "f4",
    icon: "bolt",
    text: "Energia elétrica 8% acima da média dos últimos 3 meses.",
    tone: "info",
  },
];

/** Novos vs cancelamentos (últimos meses). */
export const MOCK_ENROLLMENT_MONTHS = [
  { label: "Jan", newStudents: 12, cancellations: 4 },
  { label: "Fev", newStudents: 15, cancellations: 3 },
  { label: "Mar", newStudents: 18, cancellations: 5 },
  { label: "Abr", newStudents: 14, cancellations: 2 },
  { label: "Mai", newStudents: 18, cancellations: 3 },
];

/** Indicadores de retenção. */
export const MOCK_RETENTION_METRICS = {
  retentionRate: 84,
  atRiskCount: 5,
  lostInPeriod: 3,
  avgFrequency: 72,
};

/** Segmentação por modalidade. */
export const MOCK_MODALITY_SEGMENTS: ModalitySegment[] = [
  { id: "musculacao", name: "Musculação", retentionPct: 70, alert: true },
  { id: "pilates", name: "Pilates", retentionPct: 88 },
  { id: "funcional", name: "Funcional", retentionPct: 76 },
  { id: "yoga", name: "Yoga", retentionPct: 82 },
  { id: "crossfit", name: "CrossFit", retentionPct: 91 },
  { id: "danca", name: "Dança", retentionPct: 94 },
];

/** Metas vs realizado. */
export const MOCK_GOALS: GoalMetric[] = [
  { id: "new-students", label: "Novos alunos", target: 20, actual: 18, unit: "" },
  { id: "revenue", label: "Receita (R$ mil)", target: 50, actual: 48.2, unit: "k" },
  { id: "margin", label: "Margem líquida", target: 22, actual: 17.4, unit: "%" },
  { id: "retention", label: "Retenção", target: 90, actual: 84, unit: "%" },
];

/** Insights estratégicos dos relatórios. */
export const MOCK_REPORT_INSIGHTS: AutoInsight[] = [
  { id: "r1", icon: "trending_down", text: "Queda de frequência em Musculação (−12% vs mês anterior).", tone: "warning" },
  { id: "r2", icon: "schedule", text: "Horário 18:00–19:00 com ocupação média abaixo de 40%.", tone: "danger" },
  { id: "r3", icon: "emoji_events", text: "CrossFit e Dança lideram retenção acima de 90%.", tone: "success" },
];

/** Opções de filtro para alunos. */
export const FILTER_MODALITIES = ["Musculação", "Pilates", "Funcional", "Yoga", "CrossFit", "Dança"] as const;
export const FILTER_SHIFTS = ["Manhã", "Tarde", "Noite"] as const;
export const FILTER_PLAN_TYPES: PlanType[] = ["Mensal", "Trimestral", "Anual"];

const RISK_ORDER: Record<RiskLevel, number> = { alto: 0, atencao: 1, ativo: 2 };

/**
 * Monta o texto do alerta de ações recomendadas com base nos mocks.
 *
 * @returns Frase explicativa para o cartão superior da lista de alunos.
 */
export function getRecommendedActionsSummary(): string {
  const count = MOCK_STUDENTS.filter((s) => s.risk === "alto" || s.daysSinceVisit >= 7).length;
  return `${count} aluno(s) precisam de atenção prioritária esta semana.`;
}

/**
 * Busca um aluno pelo identificador de rota.
 *
 * @param id - Slug do aluno.
 * @returns O registro do aluno ou `undefined`.
 */
export function getStudentById(id: string): Student | undefined {
  return MOCK_STUDENTS.find((s) => s.id === id);
}

/**
 * Filtra alunos por faixa de risco.
 *
 * @param risk - Nível de risco desejado.
 * @returns Lista ordenada por prioridade.
 */
export function getStudentsByRisk(risk: RiskLevel): Student[] {
  return sortStudentsByPriority(MOCK_STUDENTS.filter((s) => s.risk === risk));
}

/**
 * Ordena alunos por risco e dias sem frequência.
 *
 * @param students - Lista a ordenar.
 * @returns Lista priorizada.
 */
export function sortStudentsByPriority(students: Student[]): Student[] {
  return [...students].sort((a, b) => {
    const riskDiff = RISK_ORDER[a.risk] - RISK_ORDER[b.risk];
    if (riskDiff !== 0) return riskDiff;
    return b.daysSinceVisit - a.daysSinceVisit;
  });
}

/**
 * Aplica filtros inteligentes à lista de alunos.
 *
 * @param filters - Critérios opcionais.
 * @returns Alunos filtrados e ordenados por prioridade.
 */
export function filterStudents(filters: StudentFilters): Student[] {
  return sortStudentsByPriority(
    MOCK_STUDENTS.filter((s) => {
      if (filters.minDaysSinceVisit !== undefined && s.daysSinceVisit < filters.minDaysSinceVisit) return false;
      if (filters.modality && s.modality !== filters.modality) return false;
      if (filters.planType && s.planType !== filters.planType) return false;
      if (filters.shift && s.shift !== filters.shift) return false;
      return true;
    }),
  );
}

/**
 * Distribuição de alunos por nível de risco.
 *
 * @returns Segmentos para gráfico donut.
 */
export function getRiskDistribution() {
  const alto = MOCK_STUDENTS.filter((s) => s.risk === "alto").length;
  const atencao = MOCK_STUDENTS.filter((s) => s.risk === "atencao").length;
  const ativo = MOCK_STUDENTS.filter((s) => s.risk === "ativo").length;
  return [
    { id: "alto", label: "Risco elevado", value: alto, strokeClass: "stroke-error", dotClass: "bg-error" },
    { id: "atencao", label: "Atenção", value: atencao, strokeClass: "stroke-secondary-container", dotClass: "bg-secondary-container" },
    { id: "ativo", label: "Ativos", value: ativo, strokeClass: "stroke-primary", dotClass: "bg-primary" },
  ];
}

/**
 * Retorna alunos em destaque no dashboard (atenção prioritária).
 *
 * @param limit - Quantidade máxima.
 * @returns Sublista priorizada.
 */
export function getDashboardPriorityStudents(limit = 5): Student[] {
  return sortStudentsByPriority(
    MOCK_STUDENTS.filter((s) => s.risk !== "ativo" || s.daysSinceVisit >= 5),
  ).slice(0, limit);
}

/**
 * Conta alunos que precisam de atenção hoje (risco ou ausência prolongada).
 *
 * @returns Quantidade para ações em massa.
 */
export function getPriorityStudentsCount(): number {
  return MOCK_STUDENTS.filter((s) => s.risk === "alto" || s.daysSinceVisit >= 7).length;
}

/**
 * Rótulo do score de retenção.
 *
 * @param score - Valor de 0 a 100.
 * @returns Rótulo Baixo, Médio ou Alto.
 */
export function getRetentionLabel(score: number): string {
  if (score >= 75) return "Alto";
  if (score >= 45) return "Médio";
  return "Baixo";
}

/**
 * Calcula tendência da presença (últimas semanas).
 *
 * @param student - Aluno.
 * @returns up, down ou stable.
 */
export function getPresenceTrend(student: Student): "up" | "down" | "stable" {
  const weeks = student.weeklyPresence;
  if (weeks.length < 2) return "stable";
  const current = weeks[0].pct;
  const previous = weeks[1].pct;
  if (current > previous + 5) return "up";
  if (current < previous - 5) return "down";
  return "stable";
}

/**
 * Recomendações automáticas baseadas no perfil do aluno.
 *
 * @param student - Aluno.
 * @returns Lista de ações sugeridas.
 */
export function getStudentRecommendations(student: Student): StudentRecommendation[] {
  const recs: StudentRecommendation[] = [];

  if (student.daysSinceVisit >= 5 || student.risk === "alto") {
    recs.push({
      id: "reengage",
      icon: "chat",
      label: "Enviar mensagem de reengajamento",
      description: `Sem comparecer há ${student.daysSinceVisit} dias.`,
      variant: "primary",
    });
  }

  if (student.presenceMonthPct < 50) {
    recs.push({
      id: "reschedule",
      icon: "calendar_today",
      label: "Sugerir troca de horário",
      description: "Horários com maior ocupação podem aumentar adesão.",
      variant: "secondary",
    });
  }

  if (student.consecutiveAbsences >= 3) {
    recs.push({
      id: "critical",
      icon: "flag",
      label: "Marcar como caso crítico",
      description: `${student.consecutiveAbsences} faltas consecutivas.`,
      variant: "danger",
    });
  }

  if (student.retentionScore >= 75 && recs.length === 0) {
    recs.push({
      id: "referral",
      icon: "loyalty",
      label: "Convidar para programa de indicação",
      description: "Aluno engajado — oportunidade de crescimento.",
      variant: "primary",
    });
  }

  return recs;
}

/**
 * Formata valor numérico em reais para exibição (pt-BR).
 *
 * @param value - Valor em reais.
 * @param compact - Se true, usa formato abreviado (ex.: 48,2k).
 * @returns String formatada.
 */
export function formatBRL(value: number, compact = false): string {
  if (compact && value >= 1000) {
    const k = value / 1000;
    const str = k % 1 === 0 ? k.toFixed(0) : k.toFixed(1).replace(".", ",");
    return `R$ ${str}k`;
  }
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

/**
 * Calcula resumo de despesas e margem do último mês mockado.
 *
 * @returns Totais, percentuais e categoria principal.
 */
export function getExpenseSummary(): ExpenseSummary {
  const last = MOCK_FINANCIAL_MONTHS[MOCK_FINANCIAL_MONTHS.length - 1];
  const total = MOCK_EXPENSES_BY_CATEGORY.reduce((s, c) => s + c.amount, 0);
  const fixed = MOCK_EXPENSES_BY_CATEGORY.filter((c) => c.type === "fixa").reduce((s, c) => s + c.amount, 0);
  const top = [...MOCK_EXPENSES_BY_CATEGORY].sort((a, b) => b.amount - a.amount)[0];
  const margin = last.revenue - last.expense;
  const marginPct = last.revenue > 0 ? (margin / last.revenue) * 100 : 0;
  return {
    total,
    fixedPct: total > 0 ? Math.round((fixed / total) * 100) : 0,
    variablePct: total > 0 ? Math.round(((total - fixed) / total) * 100) : 0,
    topCategory: top?.categoryName ?? "—",
    margin,
    marginPct: Math.round(marginPct * 10) / 10,
  };
}

/**
 * Retorna despesas agrupadas por categoria (ordenadas por valor).
 *
 * @returns Lista para gráficos de barras.
 */
export function getExpensesByCategory(): ExpenseCategoryTotal[] {
  return [...MOCK_EXPENSES_BY_CATEGORY].sort((a, b) => b.amount - a.amount);
}

/**
 * Une insights operacionais e financeiros para a página de relatórios.
 *
 * @returns Lista combinada de insights.
 */
export function getAllReportInsights(): AutoInsight[] {
  return [...MOCK_FINANCIAL_INSIGHTS, ...MOCK_REPORT_INSIGHTS];
}
