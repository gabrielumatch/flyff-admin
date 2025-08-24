"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

export function useClassFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [jobFilter, setJobFilter] = useState(
    searchParams.get("job") || ""
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const updateURL = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    updateURL({ search: debouncedSearchTerm });
  }, [debouncedSearchTerm]);

  useEffect(() => {
    updateURL({ job: jobFilter });
  }, [jobFilter]);

  useEffect(() => {
    updateURL({ page: currentPage.toString() });
  }, [currentPage]);

  const resetFilters = () => {
    setSearchTerm("");
    setJobFilter("");
    setCurrentPage(1);
    router.push(pathname);
  };

  return {
    searchTerm,
    setSearchTerm,
    jobFilter,
    setJobFilter,
    currentPage,
    setCurrentPage,
    debouncedSearchTerm,
    resetFilters,
  };
}
