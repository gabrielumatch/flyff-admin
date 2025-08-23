import type { ReactNode } from "react";
import { TwoLineText } from "@/components/two-line-text";
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
import { Edit, Trash2 } from "lucide-react";
import type { TPropSkill } from "@/types/database";

const MAIN_COLUMNS: Array<keyof TPropSkill> = [
  "dwid",
  "szname",
  "dwitemjob",
  "dwitemlv",
  "eitemtype",
  "dwitemrare",
];

interface SkillTableContentProps {
  records: TPropSkill[];
  loading: boolean;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  nameByKey: Record<string, string>;
  onEdit: (record: TPropSkill) => void;
  onDelete: (dwid: string) => void;
  buildPageHref: (page: number) => string;
  setCurrentPage: (page: number) => void;
}

export function SkillTableContent({
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
}: SkillTableContentProps) {
  const displayValue = (
    record: TPropSkill,
    key: keyof TPropSkill
  ): ReactNode => {
    if (key === "szname") {
      const translated = record.szname ? nameByKey[record.szname] : undefined;
      const primary =
        translated && translated.trim().length > 0 ? translated : record.szname;
      return <TwoLineText primary={primary} secondary={record.szname} />;
    }
    return record[key] ?? "-";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills ({totalRecords})</CardTitle>
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
                          onClick={() => onEdit(record)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(record.dwid)}
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
  );
}
