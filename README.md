# SearchNova AI

SearchNova AI is a modern SEO and keyword research platform built with Next.js, TypeScript, Tailwind CSS, and Supabase. The project is designed as a professional SaaS foundation for discovering keyword ideas, organizing research, and expanding search topics.

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4
- **Authentication & Data:** Supabase
- **Validation:** Zod
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Theming:** next-themes
- **Quality checks:** ESLint and TypeScript
- **CI:** GitHub Actions
- **Deployment:** Vercel
- **Runtime:** Node.js 20+

## Project Goals

SearchNova AI is being developed as a production-oriented SEO research application with a responsive SaaS interface. Planned capabilities include:

- Keyword discovery and expansion
- Search-question generation
- Related topics and content ideas
- SEO title and meta-description assistance
- Saved research and projects
- Search history
- Exportable research results
- User authentication and account settings
- Supabase-backed application data

## Repository Structure

The application follows the Next.js App Router architecture.

```text
.
├── app/                    # Next.js App Router pages and application entry points
├── components/             # Reusable UI and feature components
├── lib/                    # Shared utilities, Supabase clients, and validation
├── public/                 # Static assets
├── .github/workflows/      # GitHub Actions CI
├── .env.example            # Environment variable template
├── next.config.ts          # Next.js configuration and security headers
├── postcss.config.mjs      # PostCSS/Tailwind configuration
├── eslint.config.mjs       # ESLint configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project scripts and dependencies
```

## Requirements

- Node.js **20.9.0 or newer**
- npm
- A Supabase project for database/authentication features

## Environment Variables

Copy the example environment file into a local `.env.local` file and provide the appropriate values:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
AI_PROVIDER_API_KEY=
```

`AI_PROVIDER_API_KEY` is intended for server-side AI integrations and must not be exposed to the browser.

Do not commit real credentials or secrets to GitHub.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The development server normally runs at `http://localhost:3000`.

## Available Scripts

```bash
npm run dev        # Start the development server
npm run build      # Create a production build
npm run start      # Start the production server
npm run lint       # Run ESLint
npm run typecheck  # Run the TypeScript compiler without emitting files
```

## CI

The repository uses GitHub Actions to validate changes pushed to `main` and changes submitted through pull requests targeting `main`.

The CI pipeline currently performs:

1. Checkout
2. Node.js 20 setup
3. Dependency installation
4. ESLint
5. TypeScript type checking
6. Next.js production build

The workflow is defined in `.github/workflows/ci.yml`.

## Deployment

The application is intended for deployment on Vercel. The Vercel project should use the repository's `main` branch and the required production environment variables.

Before deploying a production change, verify locally or through CI that:

```bash
npm run lint
npm run typecheck
npm run build
```

all complete successfully.

## Security

The Next.js configuration includes production-oriented HTTP security headers, including content-type sniffing protection, referrer policy, frame restrictions, permissions policy, and HSTS.

Never place Supabase service-role credentials, AI provider secrets, or other private credentials in client-side code or public environment variables.

## Development Principles

- Preserve the existing application architecture when adding features.
- Prefer reusable components and shared utilities over duplicated implementations.
- Keep TypeScript strict and resolve type errors rather than suppressing them.
- Validate user-controlled input with the existing validation layer.
- Keep secrets out of source control.
- Make focused changes and verify linting, type checking, and production builds before merging.

## Status

SearchNova AI is under active development. The repository is being built incrementally toward a production-ready SEO SaaS application.
