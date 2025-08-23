import { useState, useCallback, useEffect } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { toast } from 'sonner';
import type { TPropItemEtcItem } from '@/types/database';

export function useSetsData(tableName: string, debouncedSearchTerm: string, currentPage: number, numFilter: string, jobFilter: string, sexFilter: string, levelFilter: string) {
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
        
        // First, find matching item IDs from translations and items table
        const { data: trows } = await supabase
          .from("propitem_translation")
          .select("szname")
          .or(`lang_1_us.ilike.%${term}%`);

        const { data: nrows } = await supabase
          .from("propitem")
          .select("dwid, szname")
          .or(`dwid.ilike.%${term}%,szname.ilike.%${term}%`);

        // Collect all matching dwids
        const matchingDwids = new Set<string>();
        
        // Add dwids from translations (via szname lookup)
        if (trows && trows.length > 0) {
          const sznames = trows.map(row => row.szname).filter(Boolean);
          if (sznames.length > 0) {
            const { data: itemsFromSznames } = await supabase
              .from("propitem")
              .select("dwid")
              .in("szname", sznames);
            
            if (itemsFromSznames) {
              for (const item of itemsFromSznames) {
                if (item.dwid) matchingDwids.add(item.dwid);
              }
            }
          }
        }
        
        // Add dwids from direct item search
        if (nrows) {
          for (const row of nrows) {
            if (row.dwid) matchingDwids.add(row.dwid);
          }
        }

        // Build search conditions
        const searchConditions = [`name_propitemetc.ilike.%${term}%`];
        
        // Add element name conditions for matching dwids
        if (matchingDwids.size > 0) {
          const dwidArray = Array.from(matchingDwids);
          // Use individual OR conditions instead of .in()
          for (const dwid of dwidArray) {
            for (let i = 1; i <= 8; i++) {
              searchConditions.push(`elem_${i}_name.eq.${dwid}`);
            }
          }
        }

        // Apply the search
        query = query.or(searchConditions.join(','));
      }

      // Apply filters
      if (numFilter !== "all") {
        query = query.eq("num", numFilter);
      }

      // Apply job, sex, and level filters by checking the items in the set
      if (jobFilter !== "all" || sexFilter !== "all" || levelFilter !== "all") {
        try {
          // First, get all items that match the filters
          let itemQuery = supabase.from("propitem").select("dwid");
          
          if (jobFilter !== "all") {
            itemQuery = itemQuery.eq("dwitemjob", jobFilter);
          }
          if (sexFilter !== "all") {
            itemQuery = itemQuery.eq("dwitemsex", sexFilter);
          }
          if (levelFilter !== "all") {
            itemQuery = itemQuery.eq("dwitemlv", levelFilter);
          }

          const { data: matchingItems, error: itemError } = await itemQuery;
          
          if (itemError) {
            console.error("Error fetching matching items:", itemError);
            // Continue without filtering if there's an error
          } else if (matchingItems && matchingItems.length > 0) {
            // Get the dwids of matching items
            const matchingDwids = matchingItems.map(item => item.dwid).filter(Boolean);
            
            // Limit the number of conditions to avoid URL length issues
            const limitedDwids = matchingDwids.slice(0, 50); // Limit to 50 items
            
            // Build conditions to check if any element in the set matches the filtered items
            const elementConditions = [];
            for (let i = 1; i <= 8; i++) {
              for (const dwid of limitedDwids) {
                elementConditions.push(`elem_${i}_name.eq.${dwid}`);
              }
            }
            
            if (elementConditions.length > 0) {
              // Limit the total number of OR conditions to avoid URL length issues
              const limitedConditions = elementConditions.slice(0, 200);
              query = query.or(limitedConditions.join(','));
            }
          } else {
            // If no items match the filters, return empty result
            setRecords([]);
            setTotalRecords(0);
            setTotalPages(1);
            setLoading(false);
            return;
          }
        } catch (filterError) {
          console.error("Error in filter logic:", filterError);
          // Continue without filtering if there's an error
        }
      }

      let data: TPropItemEtcItem[] | null = null;
      let count: number | null = null;
      
      try {
        const result = await query.range(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage - 1
        );

        if (result.error) {
          console.error("Error fetching sets:", result.error);
          console.error("Error details:", JSON.stringify(result.error, null, 2));
          
          // If the query is too complex, try a simpler approach
          if (result.error.message?.includes('Failed to fetch') || result.error.message?.includes('timeout')) {
            console.log("Trying simpler query approach...");
            
            // Try a basic query without complex filters
            const simpleQuery = supabase
              .from(tableName)
              .select("*", { count: "exact" })
              .is("deleted_at", null)
              .order("num")
              .range(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage - 1
              );
            
            const simpleResult = await simpleQuery;
            
            if (simpleResult.error) {
              console.error("Simple query also failed:", simpleResult.error);
              toast.error("Failed to load sets");
              return;
            }
            
            data = simpleResult.data;
            count = simpleResult.count;
          } else {
            toast.error("Failed to load sets");
            return;
          }
        } else {
          data = result.data;
          count = result.count;
        }
      } catch (queryError) {
        console.error("Error executing query:", queryError);
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
        try {
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
        } catch (translationError) {
          console.error("Error in translation fetching:", translationError);
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
  }, [supabase, tableName, debouncedSearchTerm, currentPage, numFilter, jobFilter, sexFilter, levelFilter]);

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
