import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Dashboard, type DashboardProduct } from "@/components/dasboard-view";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

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

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select("id, name, description, price, image, created_at")
    .order("created_at", { ascending: false });

  if (productsError) {
    console.error("fetchDashboardProducts", productsError);
  }

  const products: DashboardProduct[] = (productsData ?? []).map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    created_at: product.created_at,
  }));

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <Dashboard products={products} userName={userName ?? null} />
    </div>
  );
}
