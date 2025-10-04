import type { LucideIcon } from "lucide-react";
import { Boxes, Gauge, Megaphone, Radar, Route, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { createClient } from "@/lib/supabase/server";
import { hasEnvVars } from "@/lib/utils";

const valueProps: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Inventory clarity",
    description:
      "Surface every SKU, variant, and bundle without juggling spreadsheets. The dashboard keeps stock, pricing, and imagery in lockstep.",
    icon: Boxes,
  },
  {
    title: "Pricing confidence",
    description:
      "Spot trends as they happen. Track margins, average ticket size, and active promotions from a single analytics lane.",
    icon: Gauge,
  },
  {
    title: "Signal-driven launches",
    description:
      "Blend market feedback with campaign readiness. Push upcoming drops live when the data says customers are ready.",
    icon: Megaphone,
  },
];

const workflowHighlights = [
  {
    title: "Catalog health",
    description:
      "Monitor freshness scores, stale listings, and low-stock alerts before they become urgent inbox pings.",
    icon: Radar,
  },
  {
    title: "Operational guardrails",
    description:
      "Ship updates with built-in approvals, audit trails, and rollback options for safe experimentation.",
    icon: ShieldCheck,
  },
  {
    title: "Launch playbooks",
    description:
      "Assign GTM owners, align messaging, and schedule reveals directly from the dashboard timeline.",
    icon: Route,
  },
];

const heroStats = [
  {
    value: "120+",
    label: "products monitored per workspace",
  },
  {
    value: "98%",
    label: "inventory accuracy after 30 days",
  },
  {
    value: "60 min",
    label: "from upload to live storefront",
  },
];

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  const claims = data?.claims as
    | {
        email?: string;
        user_metadata?: Record<string, unknown>;
      }
    | undefined;

  const rawName = (
    claims?.user_metadata as { fullname?: unknown } | undefined
  )?.fullname;
  const email = typeof claims?.email === "string" ? claims.email : undefined;

  const userName =
    typeof rawName === "string" && rawName.trim().length > 0 ? rawName : email;
  const friendlyName = userName?.split(" ")[0] ?? null;
  const isAuthenticated = Boolean(userName);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_60%)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6">
        <nav className="sticky top-0 z-10 flex h-20 items-center justify-between bg-white/85 px-2 backdrop-blur transition-colors dark:bg-slate-950/80">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-200">
            <Link href="/" className="transition hover:text-sky-600 dark:hover:text-sky-300">
              Trial Product Store
            </Link>
          </div>
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </nav>

        <div className="flex flex-1 flex-col gap-24 py-16">
          <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 text-white shadow-xl dark:border-slate-800">
            <div className="relative z-10 grid gap-12 p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="space-y-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
                  Product Control Center
                </span>
                <div className="space-y-3">
                  <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    Bring your catalog into sharp focus.
                  </h1>
                  <p className="max-w-xl text-sm text-white/80 sm:text-base">
                    All the visibility of the dashboard—inventory insights, pricing trends, and launch readiness—now front and center on the first screen your team sees.
                  </p>
                  {isAuthenticated && (
                    <p className="text-sm text-white/80">
                      Welcome back{friendlyName ? `, ${friendlyName}` : ""}. Your live metrics are ready in the dashboard.
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-4">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
                      >
                        Go to dashboard
                      </Link>
                      <Link
                        href="/products"
                        className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Review products
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/sign-up"
                        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
                      >
                        Create your store
                      </Link>
                      <Link
                        href="/auth/login"
                        className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Sign in to demo
                      </Link>
                    </>
                  )}
                </div>
                <div className="grid gap-6 border-t border-white/30 pt-8 text-white/80 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div key={stat.value} className="space-y-2">
                      <p className="text-2xl font-semibold sm:text-3xl">{stat.value}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex flex-col gap-5 rounded-3xl border border-white/30 bg-white/10 p-8 backdrop-blur">
                <div className="rounded-2xl border border-white/20 bg-black/10 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                    Dashboard snapshot
                  </p>
                  <div className="mt-5 space-y-4 text-sm text-white/80">
                    <div className="flex items-center justify-between">
                      <span>Products in catalog</span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">Live</span>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/5 p-4 text-3xl font-semibold">
                      184
                    </div>
                    <div className="grid gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
                      <p>Average price · $3,240</p>
                      <p>Inventory value · $596K</p>
                      <p>Next launch · Electric tourer pack</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/5 p-6 text-sm text-white/80">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                    What teams are saying
                  </p>
                  <p className="mt-3 italic">
                    “It feels like the dashboard greets us on the homepage—everyone knows what deserves attention before meetings start.”
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/60">
                    Harper · Head of Merchandising
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -right-24 bottom-0 hidden h-64 w-64 rounded-full bg-white/20 blur-3xl md:block" />
            <div className="absolute -left-10 top-10 hidden h-40 w-40 rounded-full bg-white/10 blur-2xl md:block" />
          </section>

          <section className="grid gap-8 md:grid-cols-3">
            {valueProps.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="absolute -top-12 right-12 h-24 w-24 rounded-full bg-sky-400/10 blur-2xl transition group-hover:bg-sky-400/20 dark:bg-sky-500/10 dark:group-hover:bg-sky-500/30" />
                <div className="relative space-y-4">
                  <div className="inline-flex items-center justify-center rounded-2xl bg-sky-500/10 p-3 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
                </div>
              </article>
            ))}
          </section>

          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-8 transition-colors dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-600 dark:text-sky-400">
                Built around the dashboard
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
                Launch faster with the same insights your team sees after login.
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                The landing page mirrors key dashboard metrics, so product leads, merchandisers, and operators share the same pulse the moment they arrive. No more context switching.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {workflowHighlights.map(({ title, description, icon: Icon }) => (
                  <div
                    key={title}
                    className="rounded-3xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300"
                  >
                    <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-8 transition-colors dark:border-slate-800 dark:bg-slate-900/60">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_70%)]" />
              <div className="relative space-y-6 text-sm text-slate-600 dark:text-slate-300">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                  Real teams, real wins
                </p>
                <blockquote className="space-y-4 text-slate-700 dark:text-slate-200">
                  <p className="text-lg">
                    “Before Trial Product Store, our landing page felt disconnected. Now ops, marketing, and planners step in with the same dashboard numbers, so decisions happen twice as fast.”
                  </p>
                  <footer className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                    Maya · Director of Product Operations
                  </footer>
                </blockquote>
                <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 text-center dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                    Ready to move?
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-sky-500 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
                    >
                      Explore catalog tools
                    </Link>
                    {!isAuthenticated && (
                      <Link
                        href="/auth/sign-up"
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
                      >
                        Start for free
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_65%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.18),transparent_65%)]" />
            <div className="relative grid gap-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-center">
              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                  Always in sync
                </p>
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
                  One workspace, one source of truth—whether you&apos;re landing or logging in.
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Customers, operators, and leadership tap into the same command center. Start on the landing page, continue in the dashboard, and never lose momentum.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                  Your next step
                </p>
                <div className="mt-4 grid gap-3">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-between rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-100 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200 dark:hover:bg-sky-500/20"
                      >
                        <span>Open your dashboard</span>
                        <span aria-hidden>→</span>
                      </Link>
                      <Link
                        href="/products"
                        className="inline-flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800/80"
                      >
                        <span>Adjust today&apos;s listings</span>
                        <span aria-hidden>→</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/sign-up"
                        className="inline-flex items-center justify-between rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-100 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200 dark:hover:bg-sky-500/20"
                      >
                        <span>Spin up your workspace</span>
                        <span aria-hidden>→</span>
                      </Link>
                      <Link
                        href="/auth/login"
                        className="inline-flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800/80"
                      >
                        <span>Log in to explore</span>
                        <span aria-hidden>→</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 py-10 text-xs text-slate-500 transition-colors dark:border-slate-800 dark:text-slate-500">
          <p>Crafted with ♥ by Hanif · Trial Product Store</p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
