import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { AgendaPage } from "./pages/AgendaPage";
import { HomePage } from "./pages/HomePage";
import { RelatoriosPage } from "./pages/RelatoriosPage";
import { StudentDetailPage } from "./pages/StudentDetailPage";
import { StudentsPage } from "./pages/StudentsPage";

/**
 * Raiz da SPA com rotas do perfil proprietário.
 *
 * @returns Árvore de rotas da aplicação.
 */
export default function App(): JSX.Element {
  return (
    <BrowserRouter basename="/fitness">
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="alunos" element={<StudentsPage />} />
          <Route path="alunos/:studentId" element={<StudentDetailPage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="relatorios" element={<RelatoriosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
