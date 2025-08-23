import { useState, useEffect } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import * as allExports from '@/types/database';

export function useSetsOptions() {
  const { supabase } = useSupabase();
  const [options, setOptions] = useState<Record<string, string[]>>({});
  const [placeholders, setPlaceholders] = useState<Record<string, string>>({});
  const [numOptions, setNumOptions] = useState<string[]>([]);
  const [jobOptions, setJobOptions] = useState<string[]>([]);
  const [sexOptions, setSexOptions] = useState<string[]>([]);
  const [levelOptions, setLevelOptions] = useState<string[]>([]);

  useEffect(() => {
    const setsOptions: Record<string, string[]> = {};
    const setsPlaceholders: Record<string, string> = {};

    // Filter for SETS_*_OPTIONS exports
    Object.entries(allExports).forEach(([key, value]) => {
      if (key.startsWith('SETS_') && key.endsWith('_OPTIONS') && Array.isArray(value)) {
        // Remove SETS_ prefix and _OPTIONS suffix to get field name
        const fieldName = key.replace('SETS_', '').replace('_OPTIONS', '').toLowerCase();
        setsOptions[fieldName] = value;
        setsPlaceholders[fieldName] = `Select ${fieldName.replace(/_/g, ' ')}`;
      }
    });

    // Add static options for job, sex, and level
    if (allExports.DWITEMJOB_OPTIONS) {
      setJobOptions(allExports.DWITEMJOB_OPTIONS);
    }
    if (allExports.DWITEMSEX_OPTIONS) {
      setSexOptions(allExports.DWITEMSEX_OPTIONS);
    }
    if (allExports.DWITEMLV_OPTIONS) {
      setLevelOptions(allExports.DWITEMLV_OPTIONS);
    }

    setOptions(setsOptions);
    setPlaceholders(setsPlaceholders);
  }, []);

  // Fetch only set numbers from database
  useEffect(() => {
    const fetchSetNumbers = async () => {
      try {
        const { data: numData } = await supabase
          .from('propitemetc_item')
          .select('num')
          .is('deleted_at', null)
          .order('num');
        
        if (numData) {
          const uniqueNums = [...new Set(numData.map(item => item.num?.toString()).filter(Boolean))];
          setNumOptions(uniqueNums);
        }
      } catch (error) {
        console.error('Error fetching set numbers:', error);
      }
    };

    fetchSetNumbers();
  }, [supabase]);

  return { 
    options, 
    placeholders, 
    numOptions, 
    jobOptions, 
    sexOptions, 
    levelOptions 
  };
}
