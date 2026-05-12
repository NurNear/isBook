# isBook Project Continuation Notes

Last updated: 2026-05-12

## Project Goal

isBook is a personal web application for managing manga, novels, and general book collections. The app should help users know:

- Which books and volumes they own
- Which volumes are missing
- Where each book is stored
- Whether a volume is duplicated
- Who borrowed a book
- Book metadata from free APIs such as Google Books, openBD, and Rakuten Books

## Current Status

The initial project has been scaffolded and pushed to GitHub:

- Repository: `https://github.com/NurNear/isBook`
- Branch: `main`
- Frontend/backend framework: Next.js 15 App Router
- Language: TypeScript
- Styling: Tailwind CSS
- UI: shadcn/ui
- Current data source: local mock data
- Database target: Supabase Postgres
- Hosting target: Vercel Hobby

## What Has Been Built

Core setup:

- Next.js 15 project with `src/` directory
- TypeScript, ESLint, Tailwind CSS
- shadcn/ui initialized
- Basic UI components installed:
  - `button`
  - `dialog`
  - `card`
  - `table`
  - `input`
  - `form`
  - `badge`
  - `tabs`
  - `label`
- Dependencies installed:
  - `@supabase/supabase-js`
  - `@supabase/ssr`
  - `@tanstack/react-query`
  - `react-hook-form`
  - `zod`
  - `@hookform/resolvers`
  - `lucide-react`
  - `html5-qrcode`
  - `sonner`
  - `clsx`
  - `tailwind-merge`

Pages currently available:

- `/` Dashboard overview
- `/books` Book catalog
- `/collection` My collection
- `/storage` Storage management
- `/borrow` Borrow system
- `/settings` Settings and setup hints

Important files:

- `.env.example` - expected environment variables
- `supabase/schema.sql` - initial Supabase schema
- `src/types/book.ts` - core domain types
- `src/services/mock-data.ts` - temporary mock data
- `src/utils/collection.ts` - missing volume and duplicate helpers
- `src/lib/supabase/client.ts` - browser Supabase client helper
- `src/lib/supabase/server.ts` - server Supabase client helper
- `src/components/layout/app-shell.tsx` - main application shell
- `src/components/books/*` - initial table and quick-add components

## Current Commands

Install dependencies:

```bash
npm install
```

Run local dev server:

```bash
npm run dev
```

Check lint:

```bash
npm run lint
```

Check production build:

```bash
npm run build
```

The last verified build passed successfully.

## Environment Variables

Copy `.env.example` to `.env.local` for local development when real API/database integration starts.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_BOOKS_API_KEY=
RAKUTEN_APP_ID=
```

Current app pages can build without these values because they use mock data.

## Database

The initial schema lives at:

```text
supabase/schema.sql
```

Tables included:

- `book_series`
- `book_volumes`
- `locations`
- `storages`
- `shelves`
- `borrowers`
- `my_books`

Before connecting real data:

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Add Supabase env values to `.env.local` and Vercel Environment Variables.

## Deployment Plan

Recommended free hosting:

- App hosting: Vercel Hobby
- Database/auth/storage: Supabase Free

Deploy steps:

1. Go to Vercel.
2. Import GitHub repo `NurNear/isBook`.
3. Framework should auto-detect as Next.js.
4. Use default build settings:
   - Install command: `npm install`
   - Build command: `npm run build`
5. Deploy.

The first public deployment can work with mock data. Supabase env values can be added later.

## Git Notes

Git is installed locally.

Remote:

```bash
git remote -v
```

Expected:

```text
origin  https://github.com/NurNear/isBook.git (fetch)
origin  https://github.com/NurNear/isBook.git (push)
```

Push current work:

```bash
git add .
git commit -m "Your commit message"
git push
```

## Important Implementation Notes

- `next/font/google` was removed and replaced with system fonts because the local build environment could not fetch Google Fonts.
- `.env.example` is explicitly allowed in `.gitignore`.
- Real `.env*` files should stay ignored.
- `node_modules`, `.next`, build output, and dev server logs are ignored.
- The current UI is functional scaffolding, not final UX.
- Mock data should be replaced by Supabase queries in the next implementation phase.

## Suggested Next Steps

Phase 1 continuation:

1. Create Supabase project and run `supabase/schema.sql`.
2. Add typed database mapping for Supabase rows.
3. Replace `src/services/mock-data.ts` usage with real data services.
4. Implement Book CRUD:
   - create series
   - edit series
   - delete series
   - add volume
   - edit volume
5. Implement Collection CRUD:
   - add owned volume
   - update quantity
   - assign shelf
   - update status
6. Add Supabase Auth:
   - login page
   - session middleware
   - protected app routes

Phase 2:

1. Storage CRUD:
   - locations
   - storages
   - shelves
2. Search by title, ISBN, and location.
3. ISBN scanner with `html5-qrcode`.
4. Google Books API lookup.

Phase 3:

1. Missing volume detection from real collection data.
2. Duplicate detection from real collection data.
3. Borrow and return workflow.
4. Borrow history.

Phase 4:

1. Refresh latest volume from external APIs.
2. openBD integration for Japanese books.
3. Rakuten Books integration.
4. Dashboard analytics.

## Recommended Next Coding Task

Start with real Supabase integration for the catalog:

1. Define database row types in `src/types/database.ts`.
2. Add `src/services/books.ts`.
3. Query `book_series` and `book_volumes` from Supabase.
4. Update `/books` to render real rows.
5. Keep mock data as fallback only if Supabase env values are missing.

This keeps the next step small and proves that deployment, env vars, and database access work end to end.
