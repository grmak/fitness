# CopilotFit — Demo ao vivo

## Acesso rápido

**URL:** https://grmak.github.io/fitness/

**QR Code (imagem para inserir no slide):**  
https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https%3A%2F%2Fgrmak.github.io%2Ffitness%2F

**Repositório:** https://github.com/grmak/fitness

---

## Roteiro de demonstração (5–8 min)

### 1. Início `/` (~1,5 min)
- Mostrar os **3 KPIs**: Receita, Alunos ativos, Ticket médio (% vs período anterior).
- **Resumo do dia**: aulas hoje, ocupação média, turmas críticas, alunos em risco.
- **Metas do mês**: barras de progresso (novos alunos, retenção).
- Abrir um **Insight** automático (ex.: aluno sem vir há 7 dias).
- Lista **Alunos que precisam de atenção** → botão de mensagem (mock).

### 2. Alunos `/alunos` (~1,5 min)
- Cartão **Ações recomendadas** no topo.
- Gráfico **Distribuição por risco** (elevado / atenção / ativos).
- Abrir **Filtros** (dias sem comparecer, modalidade, plano, turno).
- Entrar no **detalhe** de um aluno com score baixo (chevron).

### 3. Detalhe do aluno `/alunos/:id` (~1 min)
- **Score de retenção** (0–100) e classificação Alto / Médio / Baixo.
- Métricas: dias sem vir, faltas seguidas, frequência do mês.
- **Presença — 4 semanas** e tendência (Alta / Queda / Estável).
- **Recomendações automáticas** (mensagem, troca de horário, caso crítico).

### 4. Agenda `/agenda` (~1 min)
- Insight do dia (turmas que precisam de atenção).
- Cards compactos: horário, professor, vagas, badge **Cheio / Baixo / Médio**.
- Barra de **ocupação** semafórica.

### 5. Relatórios `/relatorios` (~1,5 min)
- **Resumo financeiro**: receita, despesas, margem, ticket.
- Gráfico **Receita vs despesas** (6 meses).
- **Despesas por categoria** e **Novos vs cancelamentos**.
- Bloco **Retenção** e **Metas vs realizado** (visão completa).

### 6. Sobre `/sobre` (~30 s)
- O que é o **CopilotFit** (SPA, mock, sem backend).
- **Equipe** e **stack** (IA + React + Vite + GitHub Pages).
- Link da app publicada.

### 7. Encerramento (~30 s)
- Reforçar: protótipo orientado a **decisão do gestor**, dados simulados.
- Repetir URL e convidar o professor a abrir no telemóvel.

---

## Frase de abertura (sugestão)

> “O CopilotFit é um painel para o dono de um studio fitness ver, no mesmo dia, quem está em risco de sair, como estão as turmas e se as metas do mês estão no caminho — tudo numa SPA publicada no GitHub Pages.”

## Frase de fecho (sugestão)

> “A análise financeira completa fica em Relatórios; a página Início foca no que importa hoje: ação e prioridade.”

---

## Checklist antes de apresentar

- [ ] Abrir https://grmak.github.io/fitness/ e confirmar que carrega
- [ ] Testar rotas: `/alunos`, `/agenda`, `/relatorios`, `/sobre`
- [ ] Wi‑fi ou hotspot de backup
- [ ] Plano B: `npm run preview` local se a rede falhar
