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
- Current data source: local JSON seed data
- Database target: none
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

- `.env.example` - optional API environment variables
- `src/data/library.json` - local JSON seed data
- `src/types/book.ts` - core domain types
- `src/services/library-data.ts` - JSON data adapter
- `src/utils/collection.ts` - missing volume and duplicate helpers
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

Copy `.env.example` to `.env.local` only when external book API integration starts.

```env
GOOGLE_BOOKS_API_KEY=
RAKUTEN_APP_ID=
```

Current app pages can build without these values because they use local JSON data.

## Local JSON Storage

The seed data lives at:

```text
src/data/library.json
```

The JSON currently includes:

- `bookSeries`
- `myBooks`
- `borrowRecords`

Important limitation:

Vercel cannot persistently write changes back to `src/data/library.json` at runtime. For a no-database app, runtime edits should be stored in the user's browser with `localStorage` or `IndexedDB`, then exported/imported as JSON backups.

## Deployment Plan

Recommended free hosting:

- App hosting: Vercel Hobby
- Data storage: local browser JSON storage

Deploy steps:

1. Go to Vercel.
2. Import GitHub repo `NurNear/isBook`.
3. Framework should auto-detect as Next.js.
4. Use default build settings:
   - Install command: `npm install`
   - Build command: `npm run build`
5. Deploy.

The first public deployment works with local JSON seed data and does not need database environment variables.

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
- `src/data/library.json` is the source seed file.
- Runtime edits on the public website should use `localStorage` or `IndexedDB`.
- Add JSON import/export before relying on browser storage for important personal data.

## Suggested Next Steps

Phase 1 continuation:

1. Add a client-side library store using `localStorage`.
2. Seed the first browser session from `src/data/library.json`.
3. Add JSON export/import backup actions.
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
6. Add a reset-to-seed-data action.

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

Start with a browser JSON store:

1. Add `src/types/library.ts` for the full JSON document shape.
2. Add `src/hooks/use-library-store.ts`.
3. Load from `localStorage`, fallback to `src/data/library.json`.
4. Update `/books` and `/collection` to mutate the local store.
5. Add export/import JSON buttons in `/settings`.

This keeps the app free, simple, and deployable on static-friendly hosting while still allowing real personal data entry in one browser.
