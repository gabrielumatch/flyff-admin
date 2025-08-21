"use client";

import { useState } from "react";
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
import type { ItemRecord } from "./item-table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FieldHelpTooltip } from "@/components/field-help-tooltip";
import { getItemFieldDescription } from "@/lib/item-field-descriptions";

interface ItemAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableName: string;
  onSuccess: () => void;
}

export function ItemAddModal({
  isOpen,
  onClose,
  tableName,
  onSuccess,
}: ItemAddModalProps) {
  const { supabase } = useSupabase();
  const [formData, setFormData] = useState<Partial<ItemRecord>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof ItemRecord, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.dwid ||
      String(formData.dwid).trim() === "" ||
      !formData.szname ||
      String(formData.szname).trim() === ""
    ) {
      toast.error("dwid and szname are required");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from(tableName).insert({
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      if (error) {
        console.error("Error creating item:", error);
        toast.error("Failed to create item");
        return;
      }
      toast.success("Item created");
      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({});
      onClose();
    }
  };

  // Minimal set of fields to avoid overwhelming the add form first
  const fields: Array<keyof ItemRecord> = [
    "dwid",
    "szname",
    "dwitemjob",
    "dwitemlv",
    "eitemtype",
    "dwitemrare",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-4xl md:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>Create a new item entry</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TooltipProvider>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <Input
                      id={key}
                      value={(formData[field] as string) ?? ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                    />
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
              {loading ? "Creating..." : "Create Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
