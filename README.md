# CV Innowise

An HR web application for managing employees and their CVs, built with
Next.js and GraphQL.

## Features

### Authentication

- Login, signup, and logout.
- Forgot password / reset password.
- Access token rotation.

### User Management

- User directory with search and sorting.
- Administrators can create, edit, and remove users.
- User profile with avatar upload; editable by the owner and
  administrators.
- Per-user skills and languages (add, update, remove).

### CV Management

- CVs list with search and sorting.
- Create, edit, and preview a CV.
- CV skills and projects (add, update, remove).

### Reference Data

- Administrators manage shared reference data: departments, positions,
  skills, and languages.

## Dependencies

### Core

- [TypeScript](https://www.typescriptlang.org/) --- static typing.
- [Next.js 16](https://nextjs.org/) --- App Router and server/client
  rendering.
- [React 19](https://react.dev/) --- UI development.

### Data

- [Apollo Client](https://www.apollographql.com/docs/react/) ---
  GraphQL queries and mutations.
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) ---
  generates typed GraphQL operations from the backend schema.

### UI

- [shadcn/ui](https://ui.shadcn.com/) --- reusable UI components.
- [Base UI](https://base-ui.com/) --- UI primitives used by the
  component library.
- [Tailwind CSS v4](https://tailwindcss.com/) --- styling.
- [Lucide](https://lucide.dev/) --- icons.
- [next-themes](https://github.com/pacocoursey/next-themes) --- light/dark
  theme support.
- [Sonner](https://sonner.emilkowal.ski/) --- toast notifications.

### State & Forms

- [Zustand](https://zustand.docs.pmnd.rs/) --- client-side state
  management.
- [React Hook Form](https://react-hook-form.com/) --- form management.
- [Zod](https://zod.dev/) --- validation.

### Auth

- [jwt-decode](https://github.com/auth0/jwt-decode) --- decoding the
  access token on the client.

### Testing

- [Jest](https://jestjs.io/) --- unit test runner.
- [React Testing Library](https://testing-library.com/react) ---
  testing React components.

### Tooling

- [ESLint](https://eslint.org/) --- code quality and linting.
- [Prettier](https://prettier.io/) --- code formatting.
- [pnpm](https://pnpm.io/) --- package manager.

## Getting Started

### Prerequisites

- Node.js `>=20.9` (see `.nvmrc`)
- [pnpm](https://pnpm.io/)

### Installation

Install the project dependencies:

```bash
pnpm install
```

Create the local environment file:

```bash
cp .env.example .env.local
```

Set `NEXT_PUBLIC_GRAPHQL_URL` in `.env.local` to the running GraphQL
backend. By default:

```text
http://localhost:3001/api/graphql
```

The application requires the
[cv-node](https://github.com/cv-innowise/cv-node) GraphQL backend to be
running locally --- see that repository for setup instructions (Docker
Compose, database restore, etc.). Without it, the app will start but
data requests will fail.

### Run the application

Start the development server:

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

## Unit Tests

Run all unit tests:

```bash
pnpm test
```

Run unit tests with coverage:

```bash
pnpm test -- --coverage
```

The test suite uses Jest and React Testing Library and covers
application pages, features, entities, shared logic, and UI components.
