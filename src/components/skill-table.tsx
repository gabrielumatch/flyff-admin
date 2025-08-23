"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SkillEditModal } from "@/components/skill-edit-modal";
import { SkillAddModal } from "@/components/skill-add-modal";
import { SkillSearchFilters } from "@/components/skill-search-filters";
import { SkillTableContent } from "@/components/skill-table-content";
import { useSkillOptions } from "@/hooks/use-skill-options";
import { useSkillFilters } from "@/hooks/use-skill-filters";
import { useSkillData } from "@/hooks/use-skill-data";
import type { TPropSkill } from "@/types/database";

export function SkillTable({
  tableName,
  title,
  description,
}: {
  tableName: string;
  title: string;
  description: string;
}) {
  // Custom hooks for clean state management
  const { options: selectOptionsByField, placeholders: selectPlaceholdersByField } = useSkillOptions();
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
  } = useSkillFilters();
  const {
    records,
    loading,
    totalPages,
    totalRecords,
    nameByKey,
    itemsPerPage,
    fetchRecords,
    deleteRecord,
  } = useSkillData(tableName, debouncedSearchTerm, currentPage, jobFilter, levelFilter);

  // Modal state
  const [editingRecord, setEditingRecord] = useState<TPropSkill | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Get job and level options for filters
  const jobOptions = selectOptionsByField.dwitemjob || [];
  const levelOptions = selectOptionsByField.dwitemlv || [];

  const handleEdit = (record: TPropSkill) => {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {/* Search & Filters */}
      <SkillSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        jobFilter={jobFilter}
        onJobFilterChange={setJobFilter}
        levelFilter={levelFilter}
        onLevelFilterChange={setLevelFilter}
        jobOptions={jobOptions}
        levelOptions={levelOptions}
      />

      {/* Table Content */}
      <SkillTableContent
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
      <SkillAddModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={handleAddSuccess}
        selectOptionsByField={selectOptionsByField}
        selectPlaceholdersByField={selectPlaceholdersByField}
      />

      {/* Edit Modal */}
      {editingRecord && (
        <SkillEditModal
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
