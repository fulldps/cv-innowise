# cv-innowise

Curriculum Vitae application — a Next.js (App Router) app for managing users and CVs:
authentication, user & CV management, skills/languages, CV preview with PDF export, and settings
(language & appearance). Data comes from a local GraphQL backend consumed via Apollo Client.

> Status: scaffolding. Dependencies are installed; wiring (Apollo provider, next-intl, Jest config)
> is still pending — see [Pending setup](#pending-setup).

## Tech stack

| Layer               | Choice                                            |
| ------------------- | ------------------------------------------------- |
| Language            | TypeScript                                        |
| Framework           | Next.js App Router (SSR/SSG + client components)  |
| UI                  | shadcn/ui on Base UI primitives + Tailwind CSS v4 |
| Client state        | Zustand                                           |
| Server state / data | Apollo Client + GraphQL                           |
| Typed GraphQL       | GraphQL Code Generator (`client-preset`)          |
| Forms & validation  | React Hook Form + Zod                             |
| i18n                | next-intl                                         |
| Unit tests          | Jest + React Testing Library                      |
| Lint / format       | ESLint + Prettier                                 |

## Project structure

The project follows **Feature-Sliced Design (FSD)**:

```
src/
  app/        Next.js App Router — routing, layouts, providers, global styles
  views/      FSD "pages" layer — page compositions
  widgets/    Self-contained UI blocks
  features/   User-facing actions (login, add skill, upload avatar, …)
  entities/   Business entities (user, cv, skill, …)
  shared/     Reusable, domain-agnostic code
    ui/       shadcn/ui components
    lib/      Utilities (cn, helpers)
```

Two Next.js-specific deviations from stock FSD:

- **The FSD `pages` layer is named `views`.** In Next.js, `src/pages` is the reserved Pages Router
  directory and would conflict with the App Router.
- **There is no separate FSD `app` layer.** Next's `src/app` serves that role (routing + providers).

Import alias: `@/*` → `./src/*` (e.g. `@/shared/ui/button`). shadcn is configured via
`components.json` to generate components into `@/shared/ui` and utilities into `@/shared/lib`.

## Dependencies

Exact versions are pinned in [`package.json`](./package.json); this section documents the purpose
of each package.

### Runtime (`dependencies`)

| Package                             | Purpose                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------- |
| `next`, `react`, `react-dom`        | Framework and UI runtime (Next 16, React 19).                           |
| `@apollo/client`                    | GraphQL client — queries, mutations, normalized cache.                  |
| `@apollo/client-integration-nextjs` | Official Apollo ↔ App Router integration (RSC client, cache hydration). |
| `graphql`                           | GraphQL core (peer dependency of Apollo).                               |
| `zustand`                           | Client-side state (theme, locale, UI state).                            |
| `react-hook-form`                   | Form state and validation handling.                                     |
| `zod`                               | Schema validation.                                                      |
| `@hookform/resolvers`               | Bridges Zod schemas into React Hook Form.                               |
| `next-intl`                         | Internationalization for the App Router.                                |
| `shadcn`                            | shadcn CLI/runtime; `globals.css` imports `shadcn/tailwind.css`.        |
| `@base-ui/react`                    | Headless UI primitives that shadcn components are built on.             |
| `class-variance-authority`          | Typed component style variants.                                         |
| `clsx`, `tailwind-merge`            | Conditional classnames + Tailwind conflict resolution (`cn`).           |
| `lucide-react`                      | Icon set.                                                               |
| `tw-animate-css`                    | Animation utilities used by shadcn.                                     |

### Dev (`devDependencies`)

| Package                                                  | Purpose                                            |
| -------------------------------------------------------- | -------------------------------------------------- |
| `typescript`, `@types/*`                                 | Type system and type definitions.                  |
| `tailwindcss`, `@tailwindcss/postcss`                    | Tailwind v4 + PostCSS plugin.                      |
| `babel-plugin-react-compiler`                            | React Compiler optimization.                       |
| `@graphql-codegen/cli`, `@graphql-codegen/client-preset` | Generate typed operations from the backend schema. |
| `jest`, `jest-environment-jsdom`, `@types/jest`          | Unit test runner, DOM environment, types.          |
| `@testing-library/react`, `@testing-library/dom`         | Component testing utilities.                       |
| `@testing-library/jest-dom`                              | Custom DOM matchers.                               |
| `@testing-library/user-event`                            | Simulating user interactions.                      |
| `eslint`, `eslint-config-next`                           | Linting with Next.js rules.                        |
| `eslint-config-prettier`                                 | Disables ESLint rules that conflict with Prettier. |
| `prettier`                                               | Code formatter.                                    |

### Not yet installed

| Package               | Purpose                                 |
| --------------------- | --------------------------------------- |
| `@react-pdf/renderer` | CV PDF export (choice to be confirmed). |
| `@playwright/test`    | E2E tests (extra, planned last).        |

## Pending setup

- Jest config (`jest.config`, `jest.setup`) and `test` scripts — dependencies are installed but tests do not run yet.
- Apollo provider + server-side client wiring.
- next-intl middleware, `[locale]` segment, message catalogs.
- GraphQL Codegen config — requires the local backend schema.

## Scripts

| Script              | Description                       |
| ------------------- | --------------------------------- |
| `pnpm dev`          | Start the dev server.             |
| `pnpm build`        | Production build.                 |
| `pnpm start`        | Run the production build.         |
| `pnpm lint`         | Run ESLint.                       |
| `pnpm format`       | Format the project with Prettier. |
| `pnpm format:check` | Check formatting without writing. |

## Getting started

Prerequisites: Node.js `>=20` and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).
