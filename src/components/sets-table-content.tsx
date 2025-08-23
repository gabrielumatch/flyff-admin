"use client";

import { useState } from "react";
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

  const getElementDisplay = (record: TPropItemEtcItem) => {
    const elements = [];
    for (let i = 1; i <= 8; i++) {
      const name = record[`elem_${i}_name` as keyof TPropItemEtcItem] as string;
      const part = record[`elem_${i}_part` as keyof TPropItemEtcItem] as string;
      if (name) {
        elements.push(`${name} (${part || 'N/A'})`);
      }
    }
    return elements.slice(0, 3).join(', ') + (elements.length > 3 ? '...' : '');
  };

  const getAvailableBonuses = (record: TPropItemEtcItem) => {
    const bonuses = [];
    for (let i = 1; i <= 8; i++) {
      const dst = record[`avail_${i}_dst` as keyof TPropItemEtcItem] as string;
      const value = record[`avail_${i}_value` as keyof TPropItemEtcItem] as number;
      const pieces = record[`avail_${i}_required_pieces` as keyof TPropItemEtcItem] as number;
      if (dst && value) {
        bonuses.push(`${dst}: +${value} (${pieces} pieces)`);
      }
    }
    return bonuses.slice(0, 2).join(', ') + (bonuses.length > 2 ? '...' : '');
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
              <TableHead>ID</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Elements</TableHead>
              <TableHead>Bonuses</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No sets found
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-mono text-sm">{record.id}</TableCell>
                  <TableCell>{record.num || 'N/A'}</TableCell>
                  <TableCell className="font-medium">
                    {record.name_propitemetc || 'Unnamed Set'}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {getElementDisplay(record)}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {getAvailableBonuses(record)}
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalRecords)} of {totalRecords} sets
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={buildPageHref(currentPage - 1)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={buildPageHref(page)}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href={buildPageHref(currentPage + 1)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
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
