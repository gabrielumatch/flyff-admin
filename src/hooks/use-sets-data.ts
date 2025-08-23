import { useState, useCallback, useEffect } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { toast } from 'sonner';
import type { TPropItemEtcItem } from '@/types/database';

export function useSetsData(tableName: string, debouncedSearchTerm: string, currentPage: number, numFilter: string) {
  const { supabase } = useSupabase();
  const [records, setRecords] = useState<TPropItemEtcItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [nameByKey, setNameByKey] = useState<Record<string, string>>({});
  const [itemNameMap, setItemNameMap] = useState<Record<string, string>>({});
  const itemsPerPage = 20;

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from(tableName)
        .select("*", { count: "exact" })
        .is("deleted_at", null)
        .order("num");

      // Search functionality
      if (debouncedSearchTerm) {
        const term = debouncedSearchTerm;
        query = query.or(
          `name_propitemetc.ilike.%${term}%,elem_1_name.ilike.%${term}%`
        );
      }

      // Apply filters
      if (numFilter !== "all") {
        query = query.eq("num", numFilter);
      }

      const { data, error, count } = await query.range(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage - 1
      );

      if (error) {
        console.error("Error fetching sets:", error);
        toast.error("Failed to load sets");
        return;
      }

      const sets = (data as TPropItemEtcItem[]) || [];
      setRecords(sets);
      const total = count || 0;
      setTotalRecords(total);
      setTotalPages(Math.max(1, Math.ceil(total / itemsPerPage)));

      // Collect all unique elem_X_name values
      const elemNames = new Set<string>();
      for (const set of sets) {
        for (let i = 1; i <= 8; i++) {
          const elemName = set[`elem_${i}_name` as keyof TPropItemEtcItem] as string;
          if (elemName) {
            elemNames.add(elemName);
          }
        }
      }

      // Fetch item translations for all elem names
      const itemNameMap: Record<string, string> = {};
      if (elemNames.size > 0) {
        console.log("Fetching translations for elem names:", Array.from(elemNames));
        // First, let's try a simpler approach - check if the tables exist
        // Query both tables separately and join in JavaScript
        const { data: items, error: itemsError } = await supabase
          .from('propitem')
          .select('dwid, szname')
          .in('dwid', Array.from(elemNames));

        if (itemsError) {
          console.error("Error fetching items:", itemsError);
        } else if (items && items.length > 0) {
          // Get all sznames from the items
          const sznames = items.map(item => item.szname).filter(Boolean);
          
          if (sznames.length > 0) {
            const { data: translations, error: translationError } = await supabase
              .from('propitem_translation')
              .select('szname, lang_1_us')
              .in('szname', sznames);

            if (translationError) {
              console.error("Error fetching translations:", translationError);
            } else if (translations) {
              // Create a map of szname to translation
              const translationMap: Record<string, string> = {};
              for (const trans of translations) {
                if (trans.lang_1_us) {
                  translationMap[trans.szname] = trans.lang_1_us;
                }
              }

              // Create the final mapping of dwid to translated name
              for (const item of items) {
                const translation = translationMap[item.szname];
                if (translation) {
                  itemNameMap[item.dwid] = translation;
                } else {
                  itemNameMap[item.dwid] = item.dwid; // Fallback to dwid
                }
              }
            }
          }
        }
      }

      // Store the item name map
      setItemNameMap(itemNameMap);

      // Create name mapping for display
      const map: Record<string, string> = {};
      for (const set of sets) {
        if (set.name_propitemetc) {
          map[set.id.toString()] = set.name_propitemetc;
        }
      }
      setNameByKey(map);

    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load sets");
    } finally {
      setLoading(false);
    }
  }, [supabase, tableName, debouncedSearchTerm, currentPage, numFilter]);

  const deleteRecord = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error("Error deleting set:", error);
        toast.error("Failed to delete set");
        return;
      }

      toast.success("Set deleted successfully");
      fetchRecords();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete set");
    }
  }, [supabase, tableName, fetchRecords]);

  // Fetch records when dependencies change
  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    records,
    loading,
    totalPages,
    totalRecords,
    nameByKey,
    itemsPerPage,
    fetchRecords,
    deleteRecord,
    itemNameMap,
  };
}
