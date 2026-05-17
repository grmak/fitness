import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";

/**
 * Layout principal com área de conteúdo e navegação inferior compartilhada.
 *
 * @returns Fragmento com `Outlet` e `BottomNav`.
 */
export function AppLayout(): JSX.Element {
  return (
    <div className="mx-auto min-h-screen max-w-lg pb-24">
      <Outlet />
      <BottomNav />
    </div>
  );
}
