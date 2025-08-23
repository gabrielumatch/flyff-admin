"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ItemEditModal } from "@/components/item-edit-modal";
import { ItemAddModal } from "@/components/item-add-modal";
import { ItemSearchFilters } from "@/components/item-search-filters";
import { ItemTableContent } from "@/components/item-table-content";
import { useItemOptions } from "@/hooks/use-item-options";
import { useItemFilters } from "@/hooks/use-item-filters";
import { useItemData } from "@/hooks/use-item-data";
import type { TPropItem } from "@/types/database";

export function ItemTable({
  tableName,
  title,
  description,
}: {
  tableName: string;
  title: string;
  description: string;
}) {
  // Custom hooks for better organization
  const { options, placeholders } = useItemOptions();
  const {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    currentPage,
    setCurrentPage,
    jobFilter,
    setJobFilter,
    levelFilter,
    setLevelFilter,
    buildPageHref,
  } = useItemFilters();
  const {
    records,
    loading,
    totalPages,
    totalRecords,
    nameByKey,
    itemsPerPage,
    fetchRecords,
    deleteRecord,
  } = useItemData(tableName, debouncedSearchTerm, currentPage, jobFilter, levelFilter);

  // Modal state
  const [editingRecord, setEditingRecord] = useState<TPropItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Event handlers
  const handleEdit = (record: TPropItem) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => fetchRecords();
  const handleAddSuccess = () => fetchRecords();

  const handleDelete = (dwid: string) => deleteRecord(dwid);

  // Get specific options for filters
  const jobOptions = options.dwitemjob || [];
  const levelOptions = options.dwitemlv || [];

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
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
        </div>

        {/* Search and Filters */}
        <ItemSearchFilters
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
          jobFilter={jobFilter}
          onJobFilterChange={(value) => {
            setJobFilter(value);
            setCurrentPage(1);
          }}
          levelFilter={levelFilter}
          onLevelFilterChange={(value) => {
            setLevelFilter(value);
            setCurrentPage(1);
          }}
          jobOptions={jobOptions}
          levelOptions={levelOptions}
        />

        {/* Table Content */}
        <ItemTableContent
          records={records}
          loading={loading}
          totalRecords={totalRecords}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          nameByKey={nameByKey}
          onEdit={handleEdit}
          onDelete={handleDelete}
          buildPageHref={buildPageHref}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Modals */}
      <ItemEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRecord(null);
        }}
        record={editingRecord}
        tableName={tableName}
        onSuccess={handleEditSuccess}
        selectOptionsByField={options}
        selectPlaceholdersByField={placeholders}
      />

      <ItemAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        tableName={tableName}
        onSuccess={handleAddSuccess}
        selectOptionsByField={options}
        selectPlaceholdersByField={placeholders}
      />
    </div>
  );
}
