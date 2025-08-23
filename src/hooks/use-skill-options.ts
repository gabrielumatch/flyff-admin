import { useState, useEffect } from 'react';
import * as SkillOptions from '@/types/database';

export function useSkillOptions() {
  const [options, setOptions] = useState<Record<string, string[]>>({});
  const [placeholders, setPlaceholders] = useState<Record<string, string>>({});

  useEffect(() => {
    // Get all exported options from the database types
    const allOptions = Object.entries(SkillOptions)
      .filter(([key]) => key.endsWith('_OPTIONS'))
      .reduce((acc, [key, value]) => {
        const fieldName = key.replace('_OPTIONS', '').toLowerCase();
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
