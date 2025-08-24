import * as ClassOptions from '@/types/database';

export function useClassOptions() {
  const selectOptionsByField: Record<string, string[]> = {};
  const selectPlaceholdersByField: Record<string, string> = {};

  // Get only CLASSES_ prefixed options from the database types
  const allOptions = Object.entries(ClassOptions)
    .filter(([key]) => key.startsWith('CLASSES_') && key.endsWith('_OPTIONS'))
    .forEach(([key, options]) => {
      // Remove 'CLASSES_' prefix and '_OPTIONS' suffix, then convert to lowercase
      const fieldName = key.replace('CLASSES_', '').replace('_OPTIONS', '').toLowerCase();
      selectOptionsByField[fieldName] = options as string[];
      selectPlaceholdersByField[fieldName] = `Select ${fieldName}`;
    });

  return { selectOptionsByField, selectPlaceholdersByField };
}
