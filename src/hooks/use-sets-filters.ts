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
  const [jobFilter, setJobFilter] = useState(searchParams.get('job') || 'all');
  const [sexFilter, setSexFilter] = useState(searchParams.get('sex') || 'all');
  const [levelFilter, setLevelFilter] = useState(searchParams.get('level') || 'all');

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
    if (jobFilter !== 'all') params.set('job', jobFilter);
    if (sexFilter !== 'all') params.set('sex', sexFilter);
    if (levelFilter !== 'all') params.set('level', levelFilter);

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [currentPage, debouncedSearchTerm, numFilter, jobFilter, sexFilter, levelFilter, pathname, router]);

  // Initialize state from URL on mount or when URL changes
  useEffect(() => {
    const pageParam = Number(searchParams.get('page') || '1');
    const qParam = searchParams.get('q') || '';
    const numParam = searchParams.get('num') || 'all';
    const jobParam = searchParams.get('job') || 'all';
    const sexParam = searchParams.get('sex') || 'all';
    const levelParam = searchParams.get('level') || 'all';

    if (!Number.isNaN(pageParam) && pageParam > 0) {
      setCurrentPage(pageParam);
    }
    setSearchTerm(qParam);
    setNumFilter(numParam);
    setJobFilter(jobParam);
    setSexFilter(sexParam);
    setLevelFilter(levelParam);
  }, [searchParams]);

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    if (numFilter !== "all") params.set("num", numFilter);
    if (jobFilter !== "all") params.set("job", jobFilter);
    if (sexFilter !== "all") params.set("sex", sexFilter);
    if (levelFilter !== "all") params.set("level", levelFilter);
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
    jobFilter,
    setJobFilter,
    sexFilter,
    setSexFilter,
    levelFilter,
    setLevelFilter,
    buildPageHref,
  };
}
