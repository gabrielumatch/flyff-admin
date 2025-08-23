"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Set Data</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                  No sets found
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => {
                // Build elements section
                const elements = [];
                for (let i = 1; i <= 8; i++) {
                  const name = record[`elem_${i}_name` as keyof TPropItemEtcItem] as string;
                  const part = record[`elem_${i}_part` as keyof TPropItemEtcItem] as string;
                  if (name) {
                    const displayName = itemNameMap[name] || name; // Use translated name or fallback to ID
                    elements.push(`\t\t${displayName}\t\t${part || ''}`);
                  }
                }

                // Build bonuses section
                const bonuses = [];
                for (let i = 1; i <= 8; i++) {
                  const dst = record[`avail_${i}_dst` as keyof TPropItemEtcItem] as string;
                  const value = record[`avail_${i}_value` as keyof TPropItemEtcItem] as number;
                  const pieces = record[`avail_${i}_required_pieces` as keyof TPropItemEtcItem] as number;
                  if (dst && value) {
                    bonuses.push(`\t\t${dst}\t\t${value}\t\t${pieces || ''}`);
                  }
                }

                return (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-sm whitespace-pre">
                      {record.num || 'N/A'}&#9;{record.name_propitemetc || 'Unnamed Set'}
                      {'\n'}{'{'}
                      {'\n'}&#9;Elem
                      {'\n'}&#9;{'{'}
                      {elements.length > 0 ? '\n' + elements.join('\n') : ''}
                      {'\n'}&#9;{'}'}
                      {'\n'}&#9;Avail
                      {'\n'}&#9;{'{'}
                      {bonuses.length > 0 ? '\n' + bonuses.join('\n') : ''}
                      {'\n'}&#9;{'}'}
                      {'\n'}{'}'}
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
