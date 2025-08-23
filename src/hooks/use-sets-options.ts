import { useState, useEffect } from 'react';
import * as allExports from '@/types/database';

export function useSetsOptions() {
  const [options, setOptions] = useState<Record<string, string[]>>({});
  const [placeholders, setPlaceholders] = useState<Record<string, string>>({});

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

    setOptions(setsOptions);
    setPlaceholders(setsPlaceholders);
  }, []);

  return { options, placeholders };
}
