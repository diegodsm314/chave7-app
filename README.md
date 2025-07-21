# Gerenciador de Tarefas- Chave7 App

Aplicação web para gerenciamento de tarefas com categorias, status e datas, construída com **Next.js**, **React Query** e **TypeScript**. Ideal para organizar o fluxo de trabalho com atualizações automáticas, filtros dinâmicos e interface responsiva.

## Funcionalidades

- Criar, visualizar e excluir tarefas
- Filtrar tarefas por nome e categoria
- Marcar tarefas como **concluídas** ou **reabrir** tarefas finalizadas
- Visualização do **tempo restante** para conclusão de cada tarefa
- Atualização automática da lista de tarefas a cada **60 segundos**
- Interface responsiva com menu mobile
- Criação de tarefas via modal (desktop) ou tela cheia (mobile)

---

## Tecnologias Utilizadas

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [React Query](https://tanstack.com/query/v4)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js (API simulada ou real)](https://nodejs.org/)

---

## Estrutura de Pastas
```
app/
│
│
├── components/
│ ├── header/HeaderComponent.tsx # Cabeçalho com filtros e menu
│ ├── task/TaskList.tsx # Lista de tarefas filtradas
│ ├── card/CardComponent.tsx # Cartão visual de cada tarefa
│ └── card/CardNewTaskComponent.tsx # Formulário de nova tarefa
│
├── services/
│ ├── query.ts # Requisições com GET (busca de tarefas)
│ └── mutation.ts # Requisições com POST/PUT/DELETE
│
├── pages/
│  └──task/[id].tsx # Página de detalhes de uma tarefa
|
└── page.tsx # Página inicial com lista de tarefas
```

---

## Como executar localmente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/gerenciador-tarefas.git
   cd gerenciador-tarefas
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```
ou
    ``` bash
    yarn install
    ```

3. Rode o servidor
   ```bash
   npm run dev
   ```
ou
    ``` bash
    yarn dev
    ```

4. Acesse o navegador
    <http://localhost:3000>

## Estrutura da Tarefa (Tipo Task)
export interface Task {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: "PENDENTE" | "CONCLUIDO";
  createdAt: string;
  endDate?: string;
}

## Observações
- As tarefas são atualizadas automaticamente a cada 60 segundos, mas também é possível recarregar manualmente com um clique (futuramente).
- A contagem de tempo restante é dinâmica e atualiza a cada re-render da lista.

