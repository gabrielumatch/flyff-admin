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
  const { options: selectOptionsByField, placeholders: selectPlaceholdersByField } = useSetsOptions();
  const {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    currentPage,
    setCurrentPage,
    numFilter,
    setNumFilter,
    buildPageHref,
  } = useSetsFilters();
  const {
    records,
    loading,
    totalPages,
    totalRecords,
    nameByKey,
    itemsPerPage,
    fetchRecords,
    deleteRecord,
  } = useSetsData(tableName, debouncedSearchTerm, currentPage, numFilter);

  // Modal state
  const [editingRecord, setEditingRecord] = useState<TPropItemEtcItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Get num options for filters
  const numOptions = Array.from(new Set(records.map(r => r.num?.toString()).filter((num): num is string => Boolean(num)))).sort();

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
      <div className="max-w-none mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Set
        </Button>
      </div>

      {/* Search & Filters */}
      <SetsSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        numFilter={numFilter}
        onNumFilterChange={setNumFilter}
        numOptions={numOptions}
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
