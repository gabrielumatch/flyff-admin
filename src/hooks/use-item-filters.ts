import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useItemFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobFilter, setJobFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  // From URL
  useEffect(() => {
    const pageParam = Number(searchParams.get("page") || "1");
    const qParam = searchParams.get("q") || "";
    const jobParam = searchParams.get("job") || "all";
    const lvParam = searchParams.get("lv") || "all";
    
    if (!Number.isNaN(pageParam) && pageParam > 0) {
      setCurrentPage(pageParam);
    }
    setSearchTerm(qParam);
    setJobFilter(jobParam);
    setLevelFilter(lvParam);
  }, [searchParams]);

  // Debounce search term
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearchTerm(searchTerm), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Reflect URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", String(currentPage));
    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    if (jobFilter !== "all") params.set("job", jobFilter);
    if (levelFilter !== "all") params.set("lv", levelFilter);
    
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [currentPage, debouncedSearchTerm, jobFilter, levelFilter, pathname, router]);

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    if (jobFilter !== "all") params.set("job", jobFilter);
    if (levelFilter !== "all") params.set("lv", levelFilter);
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    currentPage,
    setCurrentPage,
    jobFilter,
    setJobFilter,
    levelFilter,
    setLevelFilter,
    buildPageHref,
  };
}
