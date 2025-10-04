# Trial Product Store

<img width="1440" height="811" alt="Screenshot 2025-10-04 at 16 26 54" src="https://github.com/user-attachments/assets/94cfdae3-7d04-47e1-9452-83c41e2e0c28" />


Modern inventory management demo built with the Next.js App Router, Supabase authentication, and shadcn/ui components. The app showcases a product catalog dashboard with protected routes, storage integration, and rich UI theming.

## Stack

- [Next.js](https://nextjs.org/) 15 (App Router + Server Actions)
- [Supabase](https://supabase.com/) for auth, database, and storage
- [shadcn/ui](https://ui.shadcn.com/) + Tailwind CSS for styling
- TypeScript, ESLint, and Turbopack dev server

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+ (or pnpm/yarn if you prefer, though scripts assume npm)
- A Supabase project with access to the SQL editor and storage

## 1. Clone the repository

```bash
git clone <your-fork-url>
cd trial-product-store
```

> If you cloned directly from the Codex workspace, you can skip the `git clone` command and simply ensure you are inside the project directory.

## 2. Install dependencies

From the project root run:

```bash
npm install
```

This installs Next.js, Supabase SDKs, shadcn/ui dependencies, and linting/tooling packages.

## 3. Configure environment variables

Copy the provided example file and populate it with your Supabase credentials.

```bash
cp .env.example .env.local
```

Update `.env.local` with values from the Supabase dashboard (`Project Settings → API`).

```
NEXT_PUBLIC_SUPABASE_URL=your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-or-service-role-key
```

Additional variables you add (e.g. bucket names) should also live in `.env.local`. The App Router automatically loads this file in development.

## 4. Run the development server

```bash
npm run dev
```

This starts the Turbopack dev server on [http://localhost:3000](http://localhost:3000). The protected dashboard will redirect to the auth pages until you sign in.

### Supabase session during local dev

- Use the Supabase dashboard to invite yourself as a user or enable email/password auth.
- The project uses cookie-based sessions via `@supabase/ssr`; no manual token handling is required.

## 5. Linting & formatting

```bash
npm run lint
```

The default configuration relies on Next.js ESLint presets. Resolve warnings about `<img>` elements or unescaped characters as needed.

## 6. Build and production preview

```bash
npm run build
npm start
```

`next build` compiles the project and validates TypeScript. `npm start` serves the optimized output at the same port (default 3000).

## 7. Useful scripts

| Script           | Description                              |
|------------------|------------------------------------------|
| `npm run dev`    | Start the Turbopack dev server           |
| `npm run lint`   | Run ESLint using the Next.js config      |
| `npm run build`  | Create a production build                |
| `npm start`      | Serve the production build               |

## Troubleshooting

- **Auth redirect loops**: confirm cookies are enabled and your Supabase URL/key are correct.
- **Storage upload errors**: ensure the `product-image` bucket exists and the anon key has upload permissions.
- **TypeScript path issues**: run `npm install` again to restore missing types.

## Deploying

You can deploy directly with Vercel or Netlify. Remember to add the same environment variables you use locally. For Vercel, connect your Supabase project via the Supabase integration to have variables synchronized automatically.

---

Feel free to adapt this README for your team’s workflows (e.g., add migration steps, CI commands, or deployment pipelines).
