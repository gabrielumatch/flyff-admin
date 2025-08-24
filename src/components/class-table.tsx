"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClassSearchFilters } from "./class-search-filters";
import { ClassTableContent } from "./class-table-content";
import { ClassAddModal } from "./class-add-modal";
import { ClassEditModal } from "./class-edit-modal";
import { useClassOptions } from "@/hooks/use-class-options";
import { useClassFilters } from "@/hooks/use-class-filters";
import { useClassData } from "@/hooks/use-class-data";
import type { TPropJob } from "@/types/database";

interface ClassTableProps {
  tableName: string;
  title: string;
  description: string;
}

export function ClassTable({ tableName, title, description }: ClassTableProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TPropJob | null>(null);

  const { selectOptionsByField, selectPlaceholdersByField } = useClassOptions();
  const {
    searchTerm,
    setSearchTerm,
    jobFilter,
    setJobFilter,
    currentPage,
    setCurrentPage,
    debouncedSearchTerm,
    resetFilters,
  } = useClassFilters();

  const { records, loading, totalRecords, totalPages, fetchRecords, deleteRecord } =
    useClassData(tableName, debouncedSearchTerm, currentPage, jobFilter);

  const handleEdit = (record: TPropJob) => {
    setSelectedRecord(record);
    setEditModalOpen(true);
  };

  const handleDelete = (jobname: string) => {
    deleteRecord(jobname);
  };

  const handleAddSuccess = () => {
    fetchRecords();
  };

  const handleEditSuccess = () => {
    fetchRecords();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Button onClick={() => setAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ClassSearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
            resetFilters={resetFilters}
            selectOptionsByField={selectOptionsByField}
          />
          <ClassTableContent
            records={records}
            loading={loading}
            totalRecords={totalRecords}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <ClassAddModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSuccess={handleAddSuccess}
        selectOptionsByField={selectOptionsByField}
        selectPlaceholdersByField={selectPlaceholdersByField}
      />

      {selectedRecord && (
        <ClassEditModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          record={selectedRecord}
          onSuccess={handleEditSuccess}
          selectOptionsByField={selectOptionsByField}
          selectPlaceholdersByField={selectPlaceholdersByField}
        />
      )}
    </div>
  );
}
