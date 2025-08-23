import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function useSetsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [numFilter, setNumFilter] = useState(searchParams.get('num') || 'all');

  // Debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set('page', String(currentPage));
    if (debouncedSearchTerm) params.set('q', debouncedSearchTerm);
    if (numFilter !== 'all') params.set('num', numFilter);

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [currentPage, debouncedSearchTerm, numFilter, pathname, router]);

  // Initialize state from URL on mount or when URL changes
  useEffect(() => {
    const pageParam = Number(searchParams.get('page') || '1');
    const qParam = searchParams.get('q') || '';
    const numParam = searchParams.get('num') || 'all';

    if (!Number.isNaN(pageParam) && pageParam > 0) {
      setCurrentPage(pageParam);
    }
    setSearchTerm(qParam);
    setNumFilter(numParam);
  }, [searchParams]);

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    if (numFilter !== "all") params.set("num", numFilter);
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    currentPage,
    setCurrentPage,
    numFilter,
    setNumFilter,
    buildPageHref,
  };
}
