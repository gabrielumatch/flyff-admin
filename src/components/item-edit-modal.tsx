"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSupabase } from "./supabase-provider";
import { toast } from "sonner";
import type { TPropItem } from "@/types/database";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FieldHelpTooltip } from "@/components/field-help-tooltip";
import { getItemFieldDescription } from "@/lib/item-field-descriptions";
import { SearchableCombobox } from "@/components/searchable-combobox";

interface ItemEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: TPropItem | null;
  tableName: string;
  onSuccess: () => void;
  selectOptionsByField: Record<string, string[]>;
  selectPlaceholdersByField?: Record<string, string>;
}

export function ItemEditModal({
  isOpen,
  onClose,
  record,
  tableName,
  onSuccess,
  selectOptionsByField,
  selectPlaceholdersByField,
}: ItemEditModalProps) {
  const { supabase } = useSupabase();
  const [formData, setFormData] = useState<Partial<TPropItem>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (record) setFormData(record);
  }, [record]);

  const handleInputChange = (field: keyof TPropItem, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!record) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from(tableName)
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq("dwid", record.dwid);
      if (error) {
        console.error("Error updating item:", error);
        toast.error("Failed to update item");
        return;
      }
      toast.success("Item updated");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) onClose();
  };
  if (!record) return null;

  const fields = Object.keys(record) as Array<keyof TPropItem>;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-[95vw] max-h-[95vh] overflow-y-auto flex flex-col"      >
      <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Update item:{" "}
            <strong>
              {record.szname} ({record.dwid})
            </strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {fields.map((field) => {
                const key = String(field);
                return (
                  <div key={key} className="space-y-2">
                    <FieldHelpTooltip
                      label={
                        <Label htmlFor={key} className="cursor-help">
                          {key}
                        </Label>
                      }
                      help={getItemFieldDescription(key)}
                    />
                    {selectOptionsByField[key] ? (
                      <SearchableCombobox
                        options={selectOptionsByField[key]}
                        value={(formData[field] as string) ?? ""}
                        onValueChange={(v) => handleInputChange(field, v)}
                        placeholder={
                          selectPlaceholdersByField?.[key] || `Select ${key}`
                        }
                        searchPlaceholder={`Search ${key}...`}
                        emptyMessage={`No ${key} options found.`}
                      />
                    ) : (
                      <Input
                        id={key}
                        value={(formData[field] as string) ?? ""}
                        onChange={(e) =>
                          handleInputChange(field, e.target.value)
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </TooltipProvider>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
