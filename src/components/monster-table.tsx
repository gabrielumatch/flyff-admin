"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MonsterEditModal } from "@/components/monster-edit-modal";
import { MonsterAddModal } from "@/components/monster-add-modal";
import { MonsterSearchFilters } from "@/components/monster-search-filters";
import { MonsterTableContent } from "@/components/monster-table-content";
import { useMonsterOptions } from "@/hooks/use-monster-options";
import { useMonsterFilters } from "@/hooks/use-monster-filters";
import { useMonsterData } from "@/hooks/use-monster-data";
import type { TPropMover } from "@/types/database";

export function MonsterTable({
  tableName,
  title,
  description,
}: {
  tableName: string;
  title: string;
  description: string;
}) {
  // Custom hooks for clean state management
  const { options: selectOptionsByField, placeholders: selectPlaceholdersByField } = useMonsterOptions();
  const {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    currentPage,
    setCurrentPage,
    levelFilter,
    setLevelFilter,
    raceFilter,
    setRaceFilter,
    buildPageHref,
  } = useMonsterFilters();
  const {
    records,
    loading,
    totalPages,
    totalRecords,
    nameByKey,
    itemsPerPage,
    fetchRecords,
    deleteRecord,
  } = useMonsterData(tableName, debouncedSearchTerm, currentPage, levelFilter, raceFilter);

  // Modal state
  const [editingRecord, setEditingRecord] = useState<TPropMover | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Get level and race options for filters
  const levelOptions = selectOptionsByField.dwlevel || [];
  const raceOptions = selectOptionsByField.dwrace || [];

  const handleEdit = (record: TPropMover) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (dwid: string) => {
    await deleteRecord(dwid);
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
          Add Monster
        </Button>
      </div>

      {/* Search & Filters */}
      <MonsterSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        levelFilter={levelFilter}
        onLevelFilterChange={setLevelFilter}
        raceFilter={raceFilter}
        onRaceFilterChange={setRaceFilter}
        levelOptions={levelOptions}
        raceOptions={raceOptions}
      />

      {/* Table Content */}
      <MonsterTableContent
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
      <MonsterAddModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={handleAddSuccess}
        selectOptionsByField={selectOptionsByField}
        selectPlaceholdersByField={selectPlaceholdersByField}
      />

      {/* Edit Modal */}
      {editingRecord && (
        <MonsterEditModal
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
