import { useState, useEffect } from 'react';
import * as MonsterOptions from '@/types/database';

export function useMonsterOptions() {
  const [options, setOptions] = useState<Record<string, string[]>>({});
  const [placeholders, setPlaceholders] = useState<Record<string, string>>({});

  useEffect(() => {
    // Get only MONSTERS_ prefixed options from the database types
    const allOptions = Object.entries(MonsterOptions)
      .filter(([key]) => key.startsWith('MONSTERS_') && key.endsWith('_OPTIONS'))
      .reduce((acc, [key, value]) => {
        // Remove 'MONSTERS_' prefix and '_OPTIONS' suffix, then convert to lowercase
        const fieldName = key.replace('MONSTERS_', '').replace('_OPTIONS', '').toLowerCase();
        acc[fieldName] = value as string[];
        return acc;
      }, {} as Record<string, string[]>);

    // Generate placeholders based on field names
    const allPlaceholders = Object.keys(allOptions).reduce((acc, fieldName) => {
      const displayName = fieldName
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize each word
      
      acc[fieldName] = `Select ${displayName}`;
      return acc;
    }, {} as Record<string, string>);

    setOptions(allOptions);
    setPlaceholders(allPlaceholders);
  }, []);

  return { options, placeholders };
}
