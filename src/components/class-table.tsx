"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClassEditModal } from "@/components/class-edit-modal";
import { ClassAddModal } from "@/components/class-add-modal";
import { ClassSearchFilters } from "@/components/class-search-filters";
import { ClassTableContent } from "@/components/class-table-content";
import { useClassOptions } from "@/hooks/use-class-options";
import { useClassFilters } from "@/hooks/use-class-filters";
import { useClassData } from "@/hooks/use-class-data";
import type { TPropJob } from "@/types/database";

export function ClassTable({
  tableName,
  title,
  description,
}: {
  tableName: string;
  title: string;
  description: string;
}) {
  // Custom hooks for clean state management
  const { selectOptionsByField, selectPlaceholdersByField } = useClassOptions();
  const {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    currentPage,
    setCurrentPage,
    jobFilter,
    setJobFilter,
  } = useClassFilters();
  const {
    records,
    loading,
    totalPages,
    totalRecords,
    fetchRecords,
    deleteRecord,
  } = useClassData(tableName, debouncedSearchTerm, currentPage, jobFilter);

  // Modal state
  const [editingRecord, setEditingRecord] = useState<TPropJob | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Get job options for filters
  const jobOptions = selectOptionsByField["jobname"] || [];

  const handleEdit = (record: TPropJob) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (jobname: string) => {
    await deleteRecord(jobname);
  };

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    fetchRecords();
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setEditingRecord(null);
    fetchRecords();
  };

  return (
    <div className="p-4">
      <div className="max-w-none mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </div>

        {/* Search & Filters */}
        <ClassSearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          jobFilter={jobFilter}
          onJobFilterChange={setJobFilter}
          jobOptions={jobOptions}
        />

        {/* Table Content */}
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

        {/* Add Modal */}
        <ClassAddModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onSuccess={handleAddSuccess}
          selectOptionsByField={selectOptionsByField}
          selectPlaceholdersByField={selectPlaceholdersByField}
        />

        {/* Edit Modal */}
        {editingRecord && (
          <ClassEditModal
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            record={editingRecord}
            onSuccess={handleEditSuccess}
            selectOptionsByField={selectOptionsByField}
            selectPlaceholdersByField={selectPlaceholdersByField}
          />
        )}
      </div>
    </div>
  );
}
