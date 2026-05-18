const PAGES_URL = "https://grmak.github.io/fitness/";

/** Item exibido como chip na seção de stack. */
interface StackItem {
  label: string;
}

/** Grupo de tecnologias com título e itens relacionados. */
interface StackCategory {
  id: string;
  title: string;
  items: readonly StackItem[];
}

/** Stack agrupada por etapa do projeto (IA → frontend → publicação). */
const STACK_CATEGORIES: readonly StackCategory[] = [
  {
    id: "ai",
    title: "Protótipo e design (IA)",
    items: [
      { label: "Glide Apps" },
      { label: "Google Stitch" },
      { label: "Cursor" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: [
      { label: "React 18" },
      { label: "TypeScript" },
      { label: "React Router 6" },
      { label: "Tailwind CSS 3" },
    ],
  },
  {
    id: "tooling",
    title: "Build e deploy",
    items: [
      { label: "Vite 7" },
      { label: "GitHub Pages" },
    ],
  },
];

/**
 * Página institucional com equipe, stack categorizada e links do projeto.
 *
 * @returns Página Sobre do CopilotFit.
 */
export function SobrePage(): JSX.Element {
  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center border-b border-gray-100 bg-white/80 px-4 shadow-sm backdrop-blur-md">
        <h1 className="text-lg font-extrabold tracking-tight text-[#2E7D32]">Sobre</h1>
      </header>

      <main className="space-y-6 px-4 pb-28 pt-6">
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-on-primary">
            <span className="material-symbols-outlined text-[28px]">robot_2</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#2E7D32]">CopilotFit</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Aplicação web do tipo SPA (Single Page Application) voltada à gestão de estúdios fitness, com foco em
            usabilidade e visão gerencial. Inclui: Dashboard estratégico, alunos, agenda e relatórios financeiros. Os
            dados são simulados via TypeScript (mock), permitindo uma experiência fluida sem backend, ideal para
            protótipos ou validação de produto.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">Equipe</h2>
          <ul className="space-y-4">
            <li>
              <p className="flex items-center gap-1.5 font-semibold text-gray-900">
                Gabriel
                <span className="material-symbols-outlined text-[18px] text-[#2E7D32]">logo_dev</span>
              </p>
              <p className="text-sm text-gray-600">Desenvolvimento e produto</p>
            </li>
            <li>
              <p className="flex items-center gap-1.5 font-semibold text-gray-900">
                Guilherme
                <span className="material-symbols-outlined text-[18px] text-[#2E7D32]">logo_dev</span>
              </p>
              <p className="text-sm text-gray-600">Desenvolvimento e UX</p>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">Stack</h2>
          <div className="space-y-5">
            {STACK_CATEGORIES.map((category) => (
              <div key={category.id}>
                <h3 className="mb-2 text-xs font-semibold text-gray-700">{category.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li
                      key={`${category.id}-${item.label}`}
                      className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-[#2E7D32]"
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">Links</h2>
          <ul className="space-y-3">
            <li>
              <a
                href={PAGES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-[#2E7D32] underline-offset-2 hover:underline"
                aria-label="Abrir CopilotFit no GitHub Pages"
              >
                <span className="material-symbols-outlined text-[20px]">language</span>
                App no GitHub Pages
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
