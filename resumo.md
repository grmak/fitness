# Resumo técnico do projeto StudioGest

## Objetivo

SPA para o **perfil do proprietário** de uma academia pequena (“StudioGest”): dashboard, alunos segmentados por risco, detalhe do aluno, agenda e relatórios — **tudo com dados mock** em TypeScript, **sem backend nem base de dados**.

## Stack

- **Vite 5** — bundler e servidor de desenvolvimento
- **React 18** + **TypeScript** — UI e tipagem
- **React Router 6** — rotas e navegação (`/`, `/alunos`, `/alunos/:id`, `/agenda`, `/relatorios`)
- **Tailwind CSS 3** — estilos; tema alinhado aos protótipos HTML (`code1/2/3.html`) e tokens do design system

## Estrutura relevante

- `src/main.tsx` — montagem da app no `#root`
- `src/App.tsx` — `BrowserRouter` e definição de rotas dentro de `AppLayout`
- `src/layouts/AppLayout.tsx` — área de conteúdo (`Outlet`) + shell mobile (`max-w-lg`)
- `src/components/BottomNav.tsx` — barra inferior com `NavLink` (estado ativo por rota)
- `src/pages/*` — `HomePage`, `StudentsPage`, `StudentDetailPage`, `AgendaPage`, `RelatoriosPage`
- `src/data/mock.ts` — tipos (`Student`, `Kpi`, etc.), arrays mock e helpers (`getStudentById`, `getStudentsByRisk`, …)
- `tailwind.config.js` / `postcss.config.js` / `src/index.css` — tema e utilitários (ex.: ícones Material Symbols via Google Fonts no `index.html`)

## Artefactos legados

Referência visual; **não** são o entrypoint da SPA: `code1.html`, `code2.html`, `code3.html`, `DESIGN*.md`.

## Build de produção

`npm run build` gera `dist/` (assets estáticos servidos por qualquer host estático ou `vite preview`).

## Rede / proxy

Se o proxy bloquear o registo npm, o erro típico é falha de certificado TLS ao contactar `registry.npmjs.org`. Nesse caso, use outra rede ou configure CA/proxy conforme a política da organização.

---

## Comandos para instalar e ver a app a funcionar

Na pasta do projeto:

```powershell
cd e:\grmak\fitness
npm install
npm run dev
```

Abra no browser o URL que o Vite indicar (normalmente `http://localhost:5173`).

### Build + pré-visualização local da versão compilada

```powershell
cd e:\grmak\fitness
npm install
npm run build
npm run preview
```
