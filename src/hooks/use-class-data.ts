"use client";

import { useState, useEffect, useCallback } from "react";
import { useSupabase } from "@/components/supabase-provider";
import { toast } from "sonner";
import type { TPropJob } from "@/types/database";

export function useClassData(
  tableName: string,
  debouncedSearchTerm: string,
  currentPage: number,
  jobFilter: string
) {
  const { supabase } = useSupabase();
  const [records, setRecords] = useState<TPropJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const ITEMS_PER_PAGE = 10;

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from(tableName)
        .select("*", { count: "exact" });

      // Apply search filter
      if (debouncedSearchTerm) {
        query = query.ilike("jobname", `%${debouncedSearchTerm}%`);
      }

      // Apply job filter
      if (jobFilter) {
        query = query.eq("jobname", jobFilter);
      }

      // Apply pagination
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching classes:", error);
        toast.error("Failed to load classes");
        return;
      }

      const classes = (data as TPropJob[]) || [];
      setRecords(classes);
      setTotalRecords(count || 0);
      setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error loading classes");
    } finally {
      setLoading(false);
    }
  }, [supabase, tableName, debouncedSearchTerm, currentPage, jobFilter]);

  const deleteRecord = useCallback(async (jobname: string) => {
    if (!confirm("Are you sure you want to delete this class?")) return;

    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq("jobname", jobname);

      if (error) {
        console.error("Error deleting class:", error);
        toast.error("Failed to delete class");
        return;
      }

      toast.success("Class deleted");
      fetchRecords(); // Refresh the list
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error");
    }
  }, [supabase, tableName, fetchRecords]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    records,
    loading,
    totalRecords,
    totalPages,
    fetchRecords,
    deleteRecord,
  };
}
