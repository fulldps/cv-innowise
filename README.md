# cv-innowise

<!-- TODO: описание -->

## Tech Stack

**Core**

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js 16](https://nextjs.org/) — App Router, SSR/SSG
- [React 19](https://react.dev/)

**Data**

- [Apollo Client](https://www.apollographql.com/docs/react/) — GraphQL, с официальной [интеграцией для App Router](https://github.com/apollographql/apollo-client-integrations)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) — типизированные операции из схемы бэкенда

**UI**

- [shadcn/ui](https://ui.shadcn.com/) на примитивах [Base UI](https://base-ui.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide](https://lucide.dev/) — иконки

**State & Forms**

- [Zustand](https://zustand.docs.pmnd.rs/) — клиентское состояние
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — формы и валидация

**i18n**

- [next-intl](https://next-intl.dev/)

**Testing**

- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/react)

**Tooling**

- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [pnpm](https://pnpm.io/)

## Getting Started

Prerequisites: Node.js `>=20.9` (see `.nvmrc`) and [pnpm](https://pnpm.io/).

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The app runs on [http://localhost:3000](http://localhost:3000).

`NEXT_PUBLIC_GRAPHQL_URL` in `.env.local` must point to the running GraphQL backend
([cv-node](https://github.com/cv-innowise/cv-node), default `http://localhost:3001/api/graphql`).

## Scripts

| Script              | Description                       |
| ------------------- | --------------------------------- |
| `pnpm dev`          | Start the dev server.             |
| `pnpm build`        | Production build.                 |
| `pnpm start`        | Run the production build.         |
| `pnpm lint`         | Run ESLint.                       |
| `pnpm format`       | Format with Prettier.             |
| `pnpm format:check` | Check formatting without writing. |
