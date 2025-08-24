"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { TPropJob } from "@/types/database";

interface ClassTableContentProps {
  records: TPropJob[];
  loading: boolean;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (record: TPropJob) => void;
  onDelete: (jobname: string) => void;
}

export function ClassTableContent({
  records,
  loading,
  totalRecords,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}: ClassTableContentProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (jobname: string) => {
    setDeletingId(jobname);
    await onDelete(jobname);
    setDeletingId(null);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    
    if (totalPages <= maxVisibleButtons) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Smart pagination for larger page counts
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
      
      if (endPage - startPage + 1 < maxVisibleButtons) {
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
      }

      // First page
      if (startPage > 1) {
        buttons.push(
          <PaginationItem key={1}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
        if (startPage > 2) {
          buttons.push(
            <PaginationItem key="ellipsis1">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
      }

      // Middle pages
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          buttons.push(
            <PaginationItem key="ellipsis2">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
        buttons.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return buttons;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Classes Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No classes match your current filters. Try adjusting your search criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {records.length} of {totalRecords} classes
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Name</TableHead>
              <TableHead>Attack Speed</TableHead>
              <TableHead>HP Scale</TableHead>
              <TableHead>MP Scale</TableHead>
              <TableHead>FP Scale</TableHead>
              <TableHead>Defense Scale</TableHead>
              <TableHead>HP Recovery</TableHead>
              <TableHead>MP Recovery</TableHead>
              <TableHead>FP Recovery</TableHead>
              <TableHead>Sword</TableHead>
              <TableHead>Axe</TableHead>
              <TableHead>Staff</TableHead>
              <TableHead>Stick</TableHead>
              <TableHead>Knuckle</TableHead>
              <TableHead>Wand</TableHead>
              <TableHead>Blocking</TableHead>
              <TableHead>Yoyo</TableHead>
              <TableHead>Critical</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.jobname}>
                <TableCell className="font-medium">{record.jobname}</TableCell>
                <TableCell>{record.attackspeed}</TableCell>
                <TableCell>{record.maxhpscale}</TableCell>
                <TableCell>{record.maxmpscale}</TableCell>
                <TableCell>{record.maxfpscale}</TableCell>
                <TableCell>{record.defensescale}</TableCell>
                <TableCell>{record.hprecoveryscale}</TableCell>
                <TableCell>{record.mprecoveryscale}</TableCell>
                <TableCell>{record.fprecoveryscale}</TableCell>
                <TableCell>{record.swd}</TableCell>
                <TableCell>{record.axe}</TableCell>
                <TableCell>{record.staff}</TableCell>
                <TableCell>{record.stick}</TableCell>
                <TableCell>{record.knuckle}</TableCell>
                <TableCell>{record.wand}</TableCell>
                <TableCell>{record.blocking}</TableCell>
                <TableCell>{record.yoyo}</TableCell>
                <TableCell>{record.critical}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
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
                      onClick={() => handleDelete(record.jobname)}
                      disabled={deletingId === record.jobname}
                    >
                      {deletingId === record.jobname ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) onPageChange(currentPage - 1);
                }}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {renderPaginationButtons()}
            
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) onPageChange(currentPage + 1);
                }}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
