import { NavLink } from "react-router-dom";

type NavKey = "home" | "alunos" | "agenda" | "relatorios" | "sobre";

interface NavItem {
  key: NavKey;
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}

const ITEMS: NavItem[] = [
  { key: "home", to: "/", label: "Início", icon: "home", end: true },
  { key: "alunos", to: "/alunos", label: "Alunos", icon: "group" },
  { key: "agenda", to: "/agenda", label: "Agenda", icon: "calendar_today" },
  { key: "relatorios", to: "/relatorios", label: "Relatórios", icon: "analytics" },
  { key: "sobre", to: "/sobre", label: "Sobre", icon: "info" },
];

/**
 * Barra inferior fixa com atalhos principais do aplicativo.
 *
 * @returns Elemento React da navegação inferior.
 */
export function BottomNav(): JSX.Element {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-gray-200 bg-white px-2 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {ITEMS.map((item) => (
        <NavLink
          key={item.key}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            [
              "flex min-w-[4.5rem] flex-col items-center justify-center rounded-xl px-3 py-1 transition-all duration-150 active:scale-95",
              isActive ? "bg-green-50/50 text-[#2E7D32]" : "text-gray-400 hover:text-[#2E7D32]",
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              <span
                className="material-symbols-outlined text-[24px]"
                style={
                  isActive
                    ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span className="text-[11px] font-medium">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
