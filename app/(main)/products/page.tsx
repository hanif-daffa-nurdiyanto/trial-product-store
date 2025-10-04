import type { ReactNode } from "react";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type SearchParamsInput =
  | Record<string, string | string[] | undefined>
  | Promise<Record<string, string | string[] | undefined>>
  | undefined;

type PageProps = {
  searchParams?: SearchParamsInput;
};

type Product = {
  id: string | number;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  created_at?: string | null;
};

const formatCurrency = (value: number | null | undefined) => {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

const normalizeId = (value: string) => {
  if (/^\d+$/.test(value)) {
    return Number(value);
  }
  return value;
};

async function createProduct(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const name = (formData.get("name") ?? "").toString().trim();
  const description =
    (formData.get("description") ?? "").toString().trim() || null;
  const priceRaw = (formData.get("price") ?? "").toString().trim();
  const price = priceRaw ? Number(priceRaw) : null;

  if (!name) {
    console.warn("Skipping product creation: name is required");
    return;
  }

  const { error } = await supabase.from("products").insert({
    name,
    description,
    price,
  });

  if (error) {
    console.error("createProduct", error);
    return;
  }

  revalidatePath("/products");
  redirect("/products");
}

async function updateProduct(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const id = (formData.get("id") ?? "").toString();
  if (!id) {
    console.warn("Skipping product update: missing id");
    return;
  }

  const name = (formData.get("name") ?? "").toString().trim();
  const description =
    (formData.get("description") ?? "").toString().trim() || null;
  const priceRaw = (formData.get("price") ?? "").toString().trim();
  const price = priceRaw ? Number(priceRaw) : null;

  if (!name) {
    console.warn("Skipping product update: name is required");
    return;
  }

  const { error } = await supabase
    .from("products")
    .update({ name, description, price })
    .eq("id", normalizeId(id));

  if (error) {
    console.error("updateProduct", error);
    return;
  }

  revalidatePath("/products");
  redirect("/products");
}

async function deleteProduct(formData: FormData) {
  "use server";
  console.log("deleteProduct called");
  const supabase = await createClient();

  const id = (formData.get("id") ?? "").toString();
  if (!id) {
    console.warn("Skipping product deletion: missing id");
    return;
  }
  console.log("Deleting product with id:", id);
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", normalizeId(id));

  if (error) {
    console.error("deleteProduct", error);
    return;
  }

  revalidatePath("/products");
  redirect("/products");
}

export default async function Page({
  searchParams: searchParamsInput,
}: PageProps) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("products").select();

  if (error) {
    console.error("fetchProducts", error);
  }

  const products: Product[] = data ?? [];

  const resolvedSearchParams = await Promise.resolve(searchParamsInput ?? {});
  console.log({ resolvedSearchParams });
  const modalParam =
    typeof resolvedSearchParams.modal === "string"
      ? resolvedSearchParams.modal
      : undefined;
  const selectedId =
    typeof resolvedSearchParams.id === "string"
      ? resolvedSearchParams.id
      : undefined;
  const selectedProduct = selectedId
    ? products.find((product) => String(product.id) === selectedId)
    : undefined;

  return (
    <main className="relative min-h-screen  text-slate-900 transition-colors  dark:text-slate-100">
      <div className="absolute inset-0 -z-10 " />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16">
        <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 dark:border-slate-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-600 dark:text-sky-400">
                Product Ops
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">
                Product Management
              </h1>
            </div>
            <Link
              href="/products?modal=create"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
            >
              Add product
            </Link>
          </div>
          <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
            Keep a single view of every product initiative. Add new entries,
            update details, or retire records without leaving this dashboard.
          </p>
        </header>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Product list
            </h2>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
              {products.length ? `${products.length} total` : "No records"}
            </span>
          </div>

          {products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
              No products yet. Add your first product to start managing the
              catalog.
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-md shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-sky-900/30">
              <div className="max-h-[70vh] overflow-y-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                  <thead className="bg-slate-100/80 dark:bg-slate-800/60">
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                      <th scope="col" className="px-6 py-4">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-4 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, idx) => {
                      const displayPrice = formatCurrency(product.price) ?? "—";
                      const description = product.description?.trim() || "—";
                      const rowClass =
                        idx % 2 === 0
                          ? "bg-white/60 dark:bg-slate-900/40"
                          : "bg-white/30 dark:bg-slate-900/30";
                      return (
                        <tr
                          key={product.id}
                          className={`${rowClass} text-sm text-slate-700 transition-colors dark:text-slate-200`}
                        >
                          <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                            {product.id}
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-50">
                            {product.name || "Untitled"}
                          </td>
                          <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                            <span className="block max-w-2xl break-words text-sm">
                              {description}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-900 dark:text-slate-100">
                            {displayPrice}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/products?modal=edit&id=${product.id}`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-sky-200 hover:text-sky-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-sky-400 dark:hover:text-sky-300"
                                aria-label={`Edit ${product.name ?? "product"}`}
                              >
                                <svg
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                >
                                  <path d="M4 13.5V16h2.5L15 7.5l-2.5-2.5L4 13.5z" />
                                  <path d="M12.5 5l2 2" />
                                </svg>
                              </Link>
                              <Link
                                href={`/products?modal=delete&id=${product.id}`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-200 text-red-500 transition hover:border-red-300 hover:text-red-600 dark:border-red-400/50 dark:text-red-300 dark:hover:border-red-300 dark:hover:text-red-200"
                                aria-label={`Delete ${
                                  product.name ?? "product"
                                }`}
                              >
                                <svg
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                >
                                  <path d="M5 6h10" />
                                  <path d="M8 6v-1a1 1 0 011-1h2a1 1 0 011 1v1" />
                                  <path d="M7 6l1 10h4l1-10" />
                                </svg>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>

      {modalParam === "create" && (
        <Modal
          title="Add product"
          description="Capture a new product and add it to your catalog."
          closeHref="/products"
        >
          <form action={createProduct} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Name
              </label>
              <input
                name="name"
                required
                placeholder="Ex: Adaptive onboarding experiments"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="What makes this product valuable?"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Price (optional)
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="99.00"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Link
                href="/products"
                className="rounded-full border border-slate-300 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-full bg-sky-600 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-sky-500 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
              >
                Create product
              </button>
            </div>
          </form>
        </Modal>
      )}

      {modalParam === "edit" && (
        <Modal
          title="Edit product"
          description="Adjust the title, pricing, or supporting context."
          closeHref="/products"
        >
          {selectedProduct ? (
            <form action={updateProduct} className="mt-6 space-y-4">
              <input
                type="hidden"
                name="id"
                value={String(selectedProduct.id)}
              />
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Name
                </label>
                <input
                  name="name"
                  defaultValue={selectedProduct.name ?? ""}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={selectedProduct.description ?? ""}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Price (optional)
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={
                    typeof selectedProduct.price === "number" &&
                    !Number.isNaN(selectedProduct.price)
                      ? selectedProduct.price
                      : ""
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Link
                  href="/products"
                  className="rounded-full border border-slate-300 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Save changes
                </button>
              </div>
            </form>
          ) : (
            <MissingProductNotice />
          )}
        </Modal>
      )}

      {modalParam === "delete" && (
        <Modal
          title="Delete product"
          description="This action cannot be undone."
          closeHref="/products"
        >
          {selectedProduct ? (
            <form action={deleteProduct} className="mt-6 space-y-4">
              <input
                type="hidden"
                name="id"
                value={String(selectedProduct.id)}
              />
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Are you sure you want to remove{" "}
                <span className="font-semibold">
                  {selectedProduct.name ?? "this product"}
                </span>{" "}
                from your catalog? You can always add it again later.
              </p>
              <div className="flex justify-end gap-3">
                <Link
                  href="/products"
                  className="rounded-full border border-slate-300 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="rounded-full border border-red-200 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-red-600 transition hover:border-red-300 hover:text-red-700 dark:border-red-400/40 dark:text-red-300 dark:hover:border-red-300/60 dark:hover:text-red-200"
                >
                  Delete product
                </button>
              </div>
            </form>
          ) : (
            <MissingProductNotice />
          )}
        </Modal>
      )}
    </main>
  );
}

function Modal({
  title,
  description,
  closeHref,
  children,
}: {
  title: string;
  description?: string;
  closeHref: string;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 px-4 py-8 backdrop-blur">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-900/30 transition-colors dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-sky-900/40">
        <Link
          href={closeHref}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200"
          aria-label="Close modal"
        >
          <span aria-hidden>&times;</span>
        </Link>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}

function MissingProductNotice() {
  return (
    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-700 dark:border-amber-400/60 dark:bg-amber-500/10 dark:text-amber-200">
      We couldn\'t find that product. It may have been removed or the link is
      invalid.
    </div>
  );
}
