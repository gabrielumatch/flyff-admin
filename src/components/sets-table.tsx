"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SetsEditModal } from "@/components/sets-edit-modal";
import { SetsAddModal } from "@/components/sets-add-modal";
import { SetsSearchFilters } from "@/components/sets-search-filters";
import { SetsTableContent } from "@/components/sets-table-content";
import { useSetsOptions } from "@/hooks/use-sets-options";
import { useSetsFilters } from "@/hooks/use-sets-filters";
import { useSetsData } from "@/hooks/use-sets-data";
import type { TPropItemEtcItem } from "@/types/database";

export function SetsTable({
  tableName,
  title,
  description,
}: {
  tableName: string;
  title: string;
  description: string;
}) {
  // Custom hooks for clean state management
  const { 
    options: selectOptionsByField, 
    placeholders: selectPlaceholdersByField,
    numOptions: dbNumOptions,
    jobOptions,
    sexOptions,
    levelOptions
  } = useSetsOptions();
  const {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    currentPage,
    setCurrentPage,
    numFilter,
    setNumFilter,
    jobFilter,
    setJobFilter,
    sexFilter,
    setSexFilter,
    levelFilter,
    setLevelFilter,
    buildPageHref,
  } = useSetsFilters();
  const {
    records,
    loading,
    totalPages,
    totalRecords,
    nameByKey,
    itemNameMap,
    itemsPerPage,
    fetchRecords,
    deleteRecord,
  } = useSetsData(tableName, debouncedSearchTerm, currentPage, numFilter, jobFilter, sexFilter, levelFilter);

  // Modal state
  const [editingRecord, setEditingRecord] = useState<TPropItemEtcItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);



  const handleEdit = (record: TPropItemEtcItem) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteRecord(id);
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
      {/* Header */}
      <div className="max-w-none mx-auto">
      <div className="flex justify-between items-center mb-8">
    
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Set
        </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <SetsSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        numFilter={numFilter}
        onNumFilterChange={setNumFilter}
        numOptions={dbNumOptions}
        jobFilter={jobFilter}
        onJobFilterChange={setJobFilter}
        sexFilter={sexFilter}
        onSexFilterChange={setSexFilter}
        levelFilter={levelFilter}
        onLevelFilterChange={setLevelFilter}
        jobOptions={jobOptions}
        sexOptions={sexOptions}
        levelOptions={levelOptions}
      />

      {/* Table Content */}
      <SetsTableContent
        records={records}
        loading={loading}
        totalRecords={totalRecords}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        nameByKey={nameByKey}
        itemNameMap={itemNameMap}
        onEdit={handleEdit}
        onDelete={handleDelete}
        buildPageHref={buildPageHref}
        setCurrentPage={setCurrentPage}
      />

      {/* Add Modal */}
      <SetsAddModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={handleAddSuccess}
        selectOptionsByField={selectOptionsByField}
        selectPlaceholdersByField={selectPlaceholdersByField}
      />

      {/* Edit Modal */}
      {editingRecord && (
        <SetsEditModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          record={editingRecord}
          onSuccess={handleEditSuccess}
          selectOptionsByField={selectOptionsByField}
          selectPlaceholdersByField={selectPlaceholdersByField}
        />
      )}
    </div>
  );
}
