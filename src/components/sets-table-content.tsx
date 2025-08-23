"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Edit, Trash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { TPropItemEtcItem } from "@/types/database";

interface SetsTableContentProps {
  records: TPropItemEtcItem[];
  loading: boolean;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  nameByKey: Record<string, string>;
  itemNameMap: Record<string, string>;
  onEdit: (record: TPropItemEtcItem) => void;
  onDelete: (id: string) => void;
  buildPageHref: (page: number) => string;
  setCurrentPage: (page: number) => void;
}

export function SetsTableContent({
  records,
  loading,
  totalRecords,
  currentPage,
  totalPages,
  itemsPerPage,
  nameByKey,
  itemNameMap,
  onEdit,
  onDelete,
  buildPageHref,
  setCurrentPage,
}: SetsTableContentProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await onDelete(deletingId);
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sets ({totalRecords})</CardTitle>
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
                  <TableHead>Set #</TableHead>
                  <TableHead>Set Name</TableHead>
                  <TableHead>Elements</TableHead>
                  <TableHead>Bonuses</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No sets found
                    </TableCell>
                  </TableRow>
                ) : (
                  records.map((record) => {
                    // Build elements data
                    const elements = [];
                    for (let i = 1; i <= 8; i++) {
                      const name = record[`elem_${i}_name` as keyof TPropItemEtcItem] as string;
                      const part = record[`elem_${i}_part` as keyof TPropItemEtcItem] as string;
                      if (name) {
                        const displayName = itemNameMap[name] || name;
                        elements.push({ name: displayName, part: part || '' });
                      }
                    }

                    // Build bonuses data
                    const bonuses = [];
                    for (let i = 1; i <= 8; i++) {
                      const dst = record[`avail_${i}_dst` as keyof TPropItemEtcItem] as string;
                      const value = record[`avail_${i}_value` as keyof TPropItemEtcItem] as number;
                      const pieces = record[`avail_${i}_required_pieces` as keyof TPropItemEtcItem] as number;
                      if (dst && value) {
                        bonuses.push({ attribute: dst, value: value, parts: pieces || 0 });
                      }
                    }

                    return (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          {record.num || 'N/A'}
                        </TableCell>
                        <TableCell className="font-medium">
                          {record.name_propitemetc || 'Unnamed Set'}
                        </TableCell>
                        <TableCell>
                          {elements.length > 0 ? (
                            <div className="space-y-1">
                              {elements.map((elem, index) => (
                                <div key={index} className="flex gap-2 text-sm">
                                  <span className="font-medium">{elem.name}</span>
                                  <span className="text-muted-foreground">({elem.part})</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">No elements</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {bonuses.length > 0 ? (
                            <div className="space-y-1">
                              {bonuses.map((bonus, index) => (
                                <div key={index} className="flex gap-2 text-sm">
                                  <span className="font-medium">{bonus.attribute}</span>
                                  <span className="text-blue-600">+{bonus.value}</span>
                                  <span className="text-muted-foreground">({bonus.parts} parts)</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">No bonuses</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEdit(record)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(record.id.toString())}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
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
                        setCurrentPage(Math.max(1, currentPage - 1));
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
                        setCurrentPage(Math.min(totalPages, currentPage + 1));
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Set</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this set? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
