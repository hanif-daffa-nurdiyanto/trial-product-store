import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

const features = [
  {
    title: "Unified roadmaps",
    description: "Connect strategy to delivery with swimlane roadmaps that update automatically as priorities shift.",
  },
  {
    title: "Customer signal hub",
    description: "Bring feedback, market research, and feature requests into one searchable space for faster decisions.",
  },
  {
    title: "Launch rituals",
    description: "Coordinate GTM plays, owners, and timelines with reusable launch templates tailored to your team.",
  },
];

const highlights = [
  {
    metric: "6x",
    caption: "faster alignment on quarterly priorities",
  },
  {
    metric: "93%",
    caption: "of teams ship roadmap commitments",
  },
  {
    metric: "24/7",
    caption: "visibility across product, design, and GTM",
  },
];

const workflows = ["Strategic Planning", "Discovery Sprints", "Roadmap Reviews", "Launch Retrospectives"];

const testimonials = [
  {
    quote:
      "Trial Product Store replaced a tangled stack of docs and decks. I can show leadership exactly how initiatives ladder to outcomes in seconds.",
    name: "Jordan F.",
    role: "Director of Product",
  },
  {
    quote:
      "Stakeholders finally see the why behind priorities. The shared signal hub keeps our roadmap honest and our team focused.",
    name: "Aria L.",
    role: "Group Product Manager",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_60%)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6">
        <nav className="sticky top-0 z-10 flex h-20 items-center justify-between bg-white/85 px-2 backdrop-blur transition-colors dark:bg-slate-950/80">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-200">
            <Link href="/" className="transition hover:text-sky-600 dark:hover:text-sky-300">
              Trial Product Store
            </Link>
            <span className="hidden text-xs text-slate-400 dark:text-slate-500 sm:inline">— product operating system</span>
          </div>
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </nav>

        <div className="flex flex-1 flex-col justify-between gap-24 py-16">
          <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/80 transition-colors dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-sky-900/20">
            <div className="absolute -left-32 top-12 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl dark:bg-sky-500/10" />
            <div className="absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-500/10" />
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-8">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-600 dark:text-sky-400">
                  Operate with clarity
                </p>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl lg:text-6xl">
                  Align product vision, insights, and execution in one command center.
                </h1>
                <p className="max-w-xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
                  Trial Product Store is your modern product ops stack. Sync goals to initiatives, surface signals that
                  matter, and ship outcomes your customers feel.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/dashboard"
                    className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200/80 transition hover:bg-sky-500 dark:bg-sky-400 dark:text-slate-950 dark:shadow-sky-500/40 dark:hover:bg-sky-300"
                  >
                    Launch your workspace
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
                  >
                    Invite the team
                  </Link>
                </div>
                <div className="grid gap-8 text-sm text-slate-500 dark:text-slate-400 sm:grid-cols-3">
                  {highlights.map((highlight) => (
                    <div key={highlight.metric}>
                      <p className="text-3xl font-semibold text-slate-900 dark:text-slate-50">{highlight.metric}</p>
                      <p>{highlight.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex h-full items-center justify-center">
                <div className="absolute inset-0 rounded-3xl border border-slate-200 transition-colors dark:border-slate-800" />
                <div className="relative grid w-full max-w-sm gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/80 transition-colors dark:bg-slate-950/70 dark:shadow-sky-900/20">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Key workflows</p>
                  <div className="space-y-3">
                    {workflows.map((workflow) => (
                      <div
                        key={workflow}
                        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-sky-200 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-sky-400"
                      >
                        <span>{workflow}</span>
                        <span className="text-xs text-sky-600 dark:text-sky-300">Open</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    View live roadmap
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-8 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-8 transition hover:border-sky-200 hover:shadow-lg hover:shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-sky-400/60 dark:hover:shadow-sky-500/20"
              >
                <div className="absolute -top-12 right-12 h-24 w-24 rounded-full bg-sky-400/30 blur-2xl transition group-hover:bg-sky-400/40 dark:bg-sky-500/10 dark:group-hover:bg-sky-500/30" />
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{feature.title}</h2>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
            ))}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-8 transition-colors dark:border-slate-800 dark:bg-slate-900/60">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.2),transparent_60%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_60%)]" />
              <div className="relative space-y-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Stay ahead of the signal</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Turn customer interviews, support trends, and product analytics into a ranked backlog your stakeholders
                  rally behind.
                </p>
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-500 dark:text-sky-300 dark:hover:text-sky-200"
                >
                  Join the beta <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-8 transition-colors dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-purple-500 dark:text-purple-300">Community voices</p>
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Momentum for modern product teams.</h2>
              <div className="space-y-6">
                {testimonials.map((testimonial) => (
                  <blockquote key={testimonial.name} className="space-y-3">
                    <p className="text-lg text-slate-700 dark:text-slate-200">“{testimonial.quote}”</p>
                    <footer className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.name} · {testimonial.role}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-8 transition-colors dark:border-slate-800 dark:bg-slate-900/60">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.25),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.25),transparent_70%)]" />
              <div className="relative space-y-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Ready to orchestrate outcomes?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Consolidate strategy docs, delivery rituals, and progress reports into a single workspace that keeps
                  every stakeholder moving in sync.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
                >
                  Explore templates
                </Link>
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
