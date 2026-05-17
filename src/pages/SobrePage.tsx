const REPO_URL = "https://github.com/grmak/fitness";
const PAGES_URL = "https://grmak.github.io/fitness/";

const STACK_ITEMS = [
  "Vite 7",
  "React 18",
  "TypeScript",
  "React Router 6",
  "Tailwind CSS 3",
] as const;

/**
 * Página institucional com equipe, stack e links do projeto.
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
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-on-primary">
            CF
          </div>
          <h2 className="text-xl font-extrabold text-[#2E7D32]">CopilotFit</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            SPA de gestão para studios fitness: dashboard estratégico, alunos, agenda, relatórios com receitas e
            despesas — dados mock em TypeScript, sem backend.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">Equipe</h2>
          <ul className="space-y-4">
            <li>
              <p className="font-semibold text-gray-900">Gabriel</p>
              <p className="text-sm text-gray-600">Desenvolvimento e produto</p>
            </li>
            <li>
              <p className="font-semibold text-gray-900">Guilherme</p>
              <p className="text-sm text-gray-600">Desenvolvimento e UX</p>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">Stack</h2>
          <ul className="flex flex-wrap gap-2">
            {STACK_ITEMS.map((item) => (
              <li
                key={item}
                className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-[#2E7D32]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">Links</h2>
          <ul className="space-y-3">
            <li>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-[#2E7D32] underline-offset-2 hover:underline"
              >
                <span className="material-symbols-outlined text-[20px]">code</span>
                Repositório no GitHub
              </a>
            </li>
            <li>
              <a
                href={PAGES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-[#2E7D32] underline-offset-2 hover:underline"
              >
                <span className="material-symbols-outlined text-[20px]">language</span>
                App publicada (GitHub Pages)
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
