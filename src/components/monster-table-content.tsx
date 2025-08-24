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
import type { TPropMover } from "@/types/database";

const MAIN_COLUMNS: Array<keyof TPropMover> = [
  "dwid",
  "szname",
  "dwlevel",
  "dwrace",
  "dwclass",
  "dwuseable",
];

interface MonsterTableContentProps {
  records: TPropMover[];
  loading: boolean;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  nameByKey: Record<string, string>;
  onEdit: (record: TPropMover) => void;
  onDelete: (dwid: string) => void;
  buildPageHref: (page: number) => string;
  setCurrentPage: (page: number) => void;
}

export function MonsterTableContent({
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
}: MonsterTableContentProps) {
  const startRecord = (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, totalRecords);

  const renderCell = (record: TPropMover, field: keyof TPropMover): ReactNode => {
    const value = record[field];
    
    if (field === "szname") {
      const translatedName = nameByKey[value as string];
      return (
        <TwoLineText
          primary={translatedName || value || ""}
          secondary={value || ""}
        />
      );
    }
    
    return value || "";
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monsters</CardTitle>
          <CardDescription>
            Loading monsters...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monsters</CardTitle>
        <CardDescription>
          Showing {startRecord} to {endRecord} of {totalRecords} monsters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {MAIN_COLUMNS.map((column) => (
                    <TableHead key={column}>{column}</TableHead>
                  ))}
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={MAIN_COLUMNS.length + 1} className="text-center">
                      No monsters found
                    </TableCell>
                  </TableRow>
                ) : (
                  records.map((record) => (
                    <TableRow key={record.dwid}>
                      {MAIN_COLUMNS.map((column) => (
                        <TableCell key={column}>
                          {renderCell(record, column)}
                        </TableCell>
                      ))}
                      <TableCell>
                        <div className="flex items-center gap-2">
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
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={buildPageHref(currentPage - 1)}
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }
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
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
