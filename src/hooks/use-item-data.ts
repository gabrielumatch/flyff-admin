import { useState, useCallback, useEffect } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { toast } from 'sonner';
import type { TPropItem } from '@/types/database';

export function useItemData(tableName: string, debouncedSearchTerm: string, currentPage: number, jobFilter: string, levelFilter: string) {
  const { supabase } = useSupabase();
  const [records, setRecords] = useState<TPropItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [nameByKey, setNameByKey] = useState<Record<string, string>>({});
  const itemsPerPage = 20;

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from(tableName)
        .select("*", { count: "exact" })
        .is("deleted_at", null)
        .order("szname");

      // Extend search to translations (lang_1_us, lang_10_pt)
      if (debouncedSearchTerm) {
        const term = debouncedSearchTerm;
        // Find matching sznames from translation table
        const { data: trows } = await supabase
          .from("propitem_translation")
          .select("szname")
          .or(`lang_1_us.ilike.%${term}%,lang_10_pt.ilike.%${term}%`);

        // Find matching sznames by raw name
        const { data: nrows } = await supabase
          .from(tableName)
          .select("szname")
          .or(
            `szname.ilike.%${term}%,dwitemjob.ilike.%${term}%,dwitemlv.ilike.%${term}%`
          );

        const keySet = new Set<string>();
        for (const r of (trows || []) as Array<{ szname: string }>) {
          if (r.szname) keySet.add(r.szname);
        }
        for (const r of (nrows || []) as Array<{ szname: string }>) {
          if (r.szname) keySet.add(r.szname);
        }

        const keys = Array.from(keySet);
        if (keys.length > 0) {
          query = query.in("szname", keys);
        } else {
          // Fallback to name match so the query still returns 0 or proper results
          query = query.ilike("szname", `%${term}%`);
        }
      }

      // Apply structured filters before range
      if (jobFilter !== "all") {
        query = query.eq("dwitemjob", jobFilter);
      }
      if (levelFilter !== "all") {
        query = query.eq("dwitemlv", levelFilter);
      }

      const { data, error, count } = await query.range(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage - 1
      );

      if (error) {
        console.error("Error fetching items:", error);
        toast.error("Failed to load items");
        return;
      }

      const items = (data as TPropItem[]) || [];
      setRecords(items);
      const total = count || 0;
      setTotalRecords(total);
      setTotalPages(Math.max(1, Math.ceil(total / itemsPerPage)));

      // Fetch translations by szname for current page only
      const keys = items.map((r) => r.szname).filter(Boolean) as string[];
      if (keys.length > 0) {
        const { data: tdata } = await supabase
          .from("propitem_translation")
          .select("szname, lang_1_us, lang_10_pt")
          .in("szname", keys);

        const map: Record<string, string> = {};
        for (const row of (tdata || []) as Array<{
          szname: string;
          lang_1_us?: string | null;
          lang_10_pt?: string | null;
        }>) {
          map[row.szname] = row.lang_1_us || row.lang_10_pt || "";
        }
        setNameByKey(map);
      } else {
        setNameByKey({});
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error loading items");
    } finally {
      setLoading(false);
    }
  }, [supabase, tableName, debouncedSearchTerm, currentPage, jobFilter, levelFilter]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const deleteRecord = async (dwid: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const { error } = await supabase
        .from(tableName)
        .update({ deleted_at: new Date().toISOString() })
        .eq("dwid", dwid);
      if (error) {
        console.error("Error deleting item:", error);
        toast.error("Failed to delete item");
        return;
      }
      toast.success("Item deleted");
      fetchRecords();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error");
    }
  };

  return {
    records,
    loading,
    totalPages,
    totalRecords,
    nameByKey,
    itemsPerPage,
    fetchRecords,
    deleteRecord,
  };
}
