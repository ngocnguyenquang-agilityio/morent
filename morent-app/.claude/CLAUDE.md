# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Morent is a car rental application. The codebase lives under `morent-app/`, which is a Next.js 16 app using React 19, TypeScript, and Tailwind CSS v4.

## Commands

All commands must be run from the `morent-app/` directory:

```bash
cd morent-app

pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Production build
pnpm lint             # ESLint (flat config with next core-web-vitals + typescript)
pnpm format           # Prettier check
pnpm format:fix       # Prettier auto-fix
pnpm test             # Run all tests (Jest + jsdom)
pnpm test -- --testPathPattern='path/to/test'  # Run a single test file
pnpm storybook        # Storybook dev server (localhost:6006)
pnpm build-storybook  # Build static Storybook
```

## Git Hooks (Husky)

- **pre-commit**: runs `pnpm lint` and `pnpm format`
- **commit-msg**: runs commitlint — messages must follow [Conventional Commits](https://www.conventionalcommits.org/), with optional ticket prefix: `[#TICKET] type(scope): subject`
- **pre-push**: runs `pnpm test` and `pnpm build`

## Code Style

- All `.ts` and `.tsx` files must use ES6+ syntax: arrow functions, `const`/`let` (no `var`), template literals, destructuring, spread/rest operators, `import`/`export` modules, `Promise`/`async`/`await`, and shorthand object properties.
- **Always use Effect-ts** (`effect` and `@effect/platform`) wherever applicable. This includes but is not limited to: error handling (use `Effect.tryPromise`, `Effect.catchAll`, typed errors instead of try/catch), data validation (use `Schema` from `effect`), async operations, service composition (use `Layer`, `Context`), data transformations (use `pipe`, `Effect.map`, `Effect.flatMap`), option/nullable handling (use `Option` instead of `null`/`undefined` checks), and collections (use `ReadonlyArray`, `HashMap` from `effect`). Prefer Effect-ts patterns over raw Promises, try/catch blocks, and manual null checks.

## Architecture

- **Package manager**: pnpm (workspace root is the repo root; `morent-app/` is the single workspace package)
- **App Router**: Next.js App Router (`morent-app/src/app/`). Uses `layout.tsx` as root layout with Geist font family.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`. Theme tokens defined in `src/app/globals.css` using `@theme inline`.
- **Testing**: Jest 30 with `jest-environment-jsdom`, `@testing-library/react`, and `@testing-library/jest-dom`. Config in `jest.config.mjs`. Path alias `@/*` maps to `src/`.
- **Storybook**: v10 with `@storybook/nextjs-vite` framework. Stories live in `src/stories/` directory. Includes a11y addon.
- **Linting**: ESLint 9 flat config (`eslint.config.mjs`) with `eslint-config-next` (core-web-vitals + typescript) and Storybook plugin.
- **Formatting**: Prettier with single quotes, semicolons, trailing commas, 2-space indent, CRLF line endings.
