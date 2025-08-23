"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { useSupabase } from "./supabase-provider";
import { TranslationEditModal } from "./translation-edit-modal";
import { TranslationAddModal } from "./translation-add-modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { TPropTranslation } from "@/types/database";
import { LANGUAGES } from "@/types/common";

interface TranslationTableProps {
  tableName: string;
  title: string;
  description: string;
}

export function TranslationTable({
  tableName,
  title,
  description,
}: TranslationTableProps) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [records, setRecords] = useState<TPropTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [editingRecord, setEditingRecord] = useState<TPropTranslation | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const itemsPerPage = 20;

  // Initialize state from URL on mount or when URL changes (via back/forward)
   
  useEffect(() => {
    const pageParam = Number(searchParams.get("page") || "1");
    const qParam = searchParams.get("q") || "";

    if (
      !Number.isNaN(pageParam) &&
      pageParam > 0 &&
      pageParam !== currentPage
    ) {
      setCurrentPage(pageParam);
    }
    if (qParam !== searchTerm) {
      setSearchTerm(qParam);
    }
  }, [searchParams]);

  // Debounce search term to reduce query churn
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearchTerm(searchTerm), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Reflect page and search in URL (keeps it shareable and navigable)
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", String(currentPage));
    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [currentPage, debouncedSearchTerm, pathname, router]);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from(tableName)
        .select("*", { count: "exact" })
        .is("deleted_at", null);

      if (debouncedSearchTerm) {
        query = query.ilike("szname", `%${debouncedSearchTerm}%`);
      }

      const { data, error, count } = await query
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
        .order("szname");

      if (error) {
        console.error("Error fetching records:", error);
        return;
      }

      setRecords(data || []);
      setTotalRecords(count || 0);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [supabase, tableName, currentPage, debouncedSearchTerm, itemsPerPage]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleEdit = (record: TPropTranslation) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    fetchRecords();
  };

  const handleAddSuccess = () => {
    fetchRecords();
  };

  const handleDelete = async (szname: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const { error } = await supabase
        .from(tableName)
        .update({ deleted_at: new Date().toISOString() })
        .eq("szname", szname);

      if (error) {
        console.error("Error deleting record:", error);
        return;
      }

      fetchRecords();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getLanguageValue = (record: TPropTranslation, langCode: string) => {
    const key = `lang_${langCode}` as keyof TPropTranslation;
    return record[key] || "";
  };

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <div className="p-4">
      <div className="max-w-none mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Translation
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search</CardTitle>
            <CardDescription>Search translations by name</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Translations ({totalRecords})</CardTitle>
            <CardDescription>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalRecords)} of{" "}
              {totalRecords} records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    {LANGUAGES.map((lang) => (
                      <TableHead key={lang.code} className="text-center">
                        <div className="flex flex-col items-center">
                          <span>{lang.flag}</span>
                          <span className="text-xs">{lang.name}</span>
                        </div>
                      </TableHead>
                    ))}
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={LANGUAGES.length + 2}
                        className="text-center py-8"
                      >
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : records.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={LANGUAGES.length + 2}
                        className="text-center py-8"
                      >
                        No records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.map((record) => (
                      <TableRow key={record.szname}>
                        <TableCell className="font-medium">
                          {record.szname}
                        </TableCell>
                        {LANGUAGES.map((lang) => (
                          <TableCell key={lang.code} className="max-w-32">
                            <div
                              className="truncate"
                              title={getLanguageValue(record, lang.code)}
                            >
                              {getLanguageValue(record, lang.code) || "-"}
                            </div>
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(record)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(record.szname)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={buildPageHref(Math.max(1, currentPage - 1))}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) => Math.max(1, prev - 1));
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                    {(() => {
                      const maxButtons = 5;
                      let start = Math.max(
                        1,
                        currentPage - Math.floor(maxButtons / 2)
                      );
                      const end = Math.min(totalPages, start + maxButtons - 1);
                      if (end - start + 1 < maxButtons) {
                        start = Math.max(1, end - maxButtons + 1);
                      }
                      const pages = [] as number[];
                      for (let p = start; p <= end; p++) pages.push(p);
                      return pages.map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href={buildPageHref(page)}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ));
                    })()}
                    <PaginationItem>
                      <PaginationNext
                        href={buildPageHref(
                          Math.min(totalPages, currentPage + 1)
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          );
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      <TranslationEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRecord(null);
        }}
        record={editingRecord}
        tableName={tableName}
        onSuccess={handleEditSuccess}
      />

      {/* Add Modal */}
      <TranslationAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        tableName={tableName}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}
