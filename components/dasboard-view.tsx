import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Boxes, Gauge, PackageSearch, Wallet } from "lucide-react";

import { Button } from "./ui/button";

export type DashboardProduct = {
  id: string | number;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  image?: string | null;
  created_at?: string | null;
};

type DashboardProps = {
  products: DashboardProduct[];
  userName?: string | null;
};

const formatCurrency = (value: number | null | undefined) => {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value);
};

export function Dashboard({ products, userName }: DashboardProps) {
  const totalInventory = products.length;
  const totalValue = products.reduce((acc, product) => {
    return acc + (typeof product.price === "number" ? product.price : 0);
  }, 0);
  const averagePrice = totalInventory ? totalValue / totalInventory : null;

  const stats: Array<{
    label: string;
    value: string;
    helper: string;
    icon: LucideIcon;
  }> = [
    {
      label: "Products in catalog",
      value: totalInventory.toString(),
      helper: "Live inside your store",
      icon: Boxes,
    },
    {
      label: "Average price",
      value: formatCurrency(averagePrice) ?? "—",
      helper: "Across current inventory",
      icon: Gauge,
    },
    {
      label: "Inventory value",
      value: formatCurrency(totalValue) ?? "—",
      helper: "Projected retail total",
      icon: Wallet,
    },
  ];

  const featuredProducts = products.slice(0, 6);
  const greetingName = userName?.trim() || "there";

  return (
    <div className="flex flex-col gap-12">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 text-white shadow-xl dark:border-slate-800">
        <div className="relative z-10 flex flex-col gap-6 p-10">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
            Control Center
          </span>
          <h1 className="text-3xl font-semibold md:text-4xl">Hi {greetingName}</h1>
          <p className="max-w-2xl text-sm text-white/80 md:text-base">
            Monitor every product from intake to checkout. Track pricing trends,
            spotlight fast movers, and keep everyone aligned on what deserves the
            next promotion.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="secondary"
              className="bg-white text-slate-900 hover:bg-white/90"
            >
              <Link href="/products">Manage products</Link>
            </Button>
            <Link
              href="/products?modal=create"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Add new product
            </Link>
          </div>
        </div>
        <div className="absolute -right-10 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full bg-white/20 blur-3xl md:block" />
        <div className="absolute bottom-0 left-16 hidden h-32 w-32 rounded-full bg-white/10 blur-2xl md:block" />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value, helper, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl  text-sky-50 dark:bg-sky-400/10">
                <Icon className="size-5 text-blue-500 dark:text-sky-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {label}
                </span>
                <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {value}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{helper}</p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Featured products
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Pulling the six most recent additions to the product catalog.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-sky-600 transition hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
          >
            View full catalog
          </Link>
        </div>

        {featuredProducts.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product, index) => {
              const price = formatCurrency(product.price) ?? "Price on request";
              const editHref = product.id
                ? `/products?modal=edit&id=${encodeURIComponent(String(product.id))}`
                : "/products";
              const cardKey = product.id ?? `product-${index}`;

              return (
                <article
                  key={String(cardKey)}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60"
                >
                  {product.image ? (
                    <div className="overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name ?? "Product"}
                        className="h-40 w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400">
                      <PackageSearch className="size-10" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {product.name ?? "Untitled product"}
                    </h3>
                    {product.description ? (
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {product.description}
                      </p>
                    ) : (
                      <p className="text-sm italic text-slate-400 dark:text-slate-500">
                        No description provided.
                      </p>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {price}
                    </span>
                    <Link
                      href={editHref}
                      className="text-sm font-medium text-sky-600 transition hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
                    >
                      Manage
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
            <PackageSearch className="size-10 text-slate-400" />
            <p className="max-w-sm text-sm">
              Your dashboard is ready for its first product. Add an item to see
              live catalog insights.
            </p>
            <Button asChild>
              <Link href="/products?modal=create">Add the first product</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
