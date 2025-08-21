"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { TwoLineText } from "@/components/two-line-text";
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
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ItemEditModal } from "@/components/item-edit-modal";
import { ItemAddModal } from "@/components/item-add-modal";

export type ItemRecord = {
  dwid: string;
  szname: string;
  dwitemjob?: string | null;
  dwitemlv?: string | null;
  eitemtype?: string | null;
  dwitemrare?: string | null;
  deleted_at?: string | null;
} & Record<string, string | null | undefined>;

const MAIN_COLUMNS: Array<keyof ItemRecord> = [
  "dwid",
  "szname",
  "dwitemjob",
  "dwitemlv",
  "eitemtype",
  "dwitemrare",
];

export function ItemTable({
  tableName,
  title,
  description,
}: {
  tableName: string;
  title: string;
  description: string;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [records, setRecords] = useState<ItemRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [editingRecord, setEditingRecord] = useState<ItemRecord | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [nameByKey, setNameByKey] = useState<Record<string, string>>({});
  const itemsPerPage = 20;

  // From URL
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearchTerm(searchTerm), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Reflect URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", String(currentPage));
    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [currentPage, debouncedSearchTerm, pathname, router]);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from(tableName)
        .select("*", { count: "exact" })
        .is("deleted_at", null)
        .order("szname");

      // Extend search to translations (lang_1_us, lang_10_pt)
      if (debouncedSearchTerm) {
        const term = debouncedSearchTerm;
        // Find matching sznames from translation table
        const { data: trows } = await supabase
          .from("propitem_translation")
          .select("szname")
          .or(`lang_1_us.ilike.%${term}%,lang_10_pt.ilike.%${term}%`);

        // Find matching sznames by raw name
        const { data: nrows } = await supabase
          .from(tableName)
          .select("szname")
          .ilike("szname", `%${term}%`);

        const keySet = new Set<string>();
        for (const r of (trows || []) as Array<{ szname: string }>) {
          if (r.szname) keySet.add(r.szname);
        }
        for (const r of (nrows || []) as Array<{ szname: string }>) {
          if (r.szname) keySet.add(r.szname);
        }

        const keys = Array.from(keySet);
        if (keys.length > 0) {
          query = query.in("szname", keys);
        } else {
          // Fallback to name match so the query still returns 0 or proper results
          query = query.ilike("szname", `%${term}%`);
        }
      }

      const { data, error, count } = await query.range(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage - 1
      );

      if (error) {
        console.error("Error fetching items:", error);
        toast.error("Failed to load items");
        return;
      }

      const items = (data as ItemRecord[]) || [];
      setRecords(items);
      const total = count || 0;
      setTotalRecords(total);
      setTotalPages(Math.max(1, Math.ceil(total / itemsPerPage)));

      // Fetch translations by szname for current page only
      const keys = items.map((r) => r.szname).filter(Boolean) as string[];
      if (keys.length > 0) {
        const { data: tdata } = await supabase
          .from("propitem_translation")
          .select("szname, lang_1_us, lang_10_pt")
          .in("szname", keys);

        const map: Record<string, string> = {};
        for (const row of (tdata || []) as Array<{
          szname: string;
          lang_1_us?: string | null;
          lang_10_pt?: string | null;
        }>) {
          map[row.szname] = row.lang_1_us || row.lang_10_pt || "";
        }
        setNameByKey(map);
      } else {
        setNameByKey({});
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error loading items");
    } finally {
      setLoading(false);
    }
  }, [supabase, tableName, debouncedSearchTerm, currentPage]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleEdit = (record: ItemRecord) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => fetchRecords();
  const handleAddSuccess = () => fetchRecords();

  const handleDelete = async (dwid: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const { error } = await supabase
        .from(tableName)
        .update({ deleted_at: new Date().toISOString() })
        .eq("dwid", dwid);
      if (error) {
        console.error("Error deleting item:", error);
        toast.error("Failed to delete item");
        return;
      }
      toast.success("Item deleted");
      fetchRecords();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error");
    }
  };

  const displayValue = (
    record: ItemRecord,
    key: keyof ItemRecord
  ): ReactNode => {
    if (key === "szname") {
      const translated = record.szname ? nameByKey[record.szname] : undefined;
      const primary =
        translated && translated.trim().length > 0 ? translated : record.szname;
      return <TwoLineText primary={primary} secondary={record.szname} />;
    }
    return record[key] ?? "-";
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
            Add New Item
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search</CardTitle>
            <CardDescription>Search items by name</CardDescription>
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

        <Card>
          <CardHeader>
            <CardTitle>Items ({totalRecords})</CardTitle>
            <CardDescription>
              Showing{" "}
              {(currentPage - 1) * itemsPerPage + (totalRecords === 0 ? 0 : 1)}{" "}
              to {Math.min(currentPage * itemsPerPage, totalRecords)} of{" "}
              {totalRecords} records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {MAIN_COLUMNS.map((col) => (
                      <TableHead key={col}>{col}</TableHead>
                    ))}
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={MAIN_COLUMNS.length + 1}
                        className="text-center py-8"
                      >
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : records.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={MAIN_COLUMNS.length + 1}
                        className="text-center py-8"
                      >
                        No records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.map((record) => (
                      <TableRow key={record.dwid}>
                        {MAIN_COLUMNS.map((col) => (
                          <TableCell key={String(col)}>
                            {displayValue(record, col)}
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
                              onClick={() => handleDelete(record.dwid)}
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
                      if (end - start + 1 < maxButtons)
                        start = Math.max(1, end - maxButtons + 1);
                      const pages: number[] = [];
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

      <ItemEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRecord(null);
        }}
        record={editingRecord}
        tableName={tableName}
        onSuccess={handleEditSuccess}
      />

      <ItemAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        tableName={tableName}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}
