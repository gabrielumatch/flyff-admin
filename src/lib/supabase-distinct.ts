import type { SupabaseClient } from "@supabase/supabase-js";

// Fetch distinct non-empty values for a given column via RPC only.
// Expects an RPC named `distinct_<table>_<column>` that returns rows
// with a property matching `column`.
export async function fetchDistinctOptions(
  supabase: SupabaseClient,
  tableName: string,
  column: string,
  rpcNameOverride?: string
): Promise<string[]> {
  try {
    const rpcName = (rpcNameOverride ||
      `distinct_${tableName}_${column}`) as any;
    const { data, error } = await supabase.rpc(rpcName);
    if (error || !Array.isArray(data)) return [];
    const values = (data as Array<Record<string, unknown>>)
      .map((r) => {
        const direct = r?.[column] as unknown;
        const candidate = direct ?? Object.values(r)[0];
        if (candidate == null) return "";
        if (typeof candidate === "number") return String(candidate);
        return (candidate as string) || "";
      })
      .filter((v) => typeof v === "string" && v.length > 0);
    return Array.from(new Set(values));
  } catch (_e) {
    return [];
  }
}
