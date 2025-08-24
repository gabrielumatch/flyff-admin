import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useMonsterFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [raceFilter, setRaceFilter] = useState<string>("all");

  // From URL
  useEffect(() => {
    const pageParam = Number(searchParams.get("page") || "1");
    const qParam = searchParams.get("q") || "";
    const levelParam = searchParams.get("level") || "all";
    const raceParam = searchParams.get("race") || "all";
    
    if (!Number.isNaN(pageParam) && pageParam > 0) {
      setCurrentPage(pageParam);
    }
    setSearchTerm(qParam);
    setLevelFilter(levelParam);
    setRaceFilter(raceParam);
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
    if (levelFilter !== "all") params.set("level", levelFilter);
    if (raceFilter !== "all") params.set("race", raceFilter);
    
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [currentPage, debouncedSearchTerm, levelFilter, raceFilter, pathname, router]);

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    if (levelFilter !== "all") params.set("level", levelFilter);
    if (raceFilter !== "all") params.set("race", raceFilter);
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    currentPage,
    setCurrentPage,
    levelFilter,
    setLevelFilter,
    raceFilter,
    setRaceFilter,
    buildPageHref,
  };
}
