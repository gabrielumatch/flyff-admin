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
import type { ItemRecord } from "./item-table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FieldHelpTooltip } from "@/components/field-help-tooltip";
import { getItemFieldDescription } from "@/lib/item-field-descriptions";
import { OptionsSelect } from "@/components/options-select";

interface ItemAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableName: string;
  onSuccess: () => void;
  jobOptions: string[];
  kind1Options: string[];
  kind2Options: string[];
  kind3Options: string[];
}

export function ItemAddModal({
  isOpen,
  onClose,
  tableName,
  onSuccess,
  jobOptions,
  kind1Options,
  kind2Options,
  kind3Options,
}: ItemAddModalProps) {
  const { supabase } = useSupabase();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [allFields, setAllFields] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dwid?.trim() || !formData.szname?.trim()) {
      toast.error("dwid and szname are required");
      return;
    }

    setLoading(true);
    try {
      const payload: Record<string, string | null> = {};
      for (const k of allFields) {
        if (k === "updated_at" || k === "deleted_at") continue;
        if (k === "created_at") continue;
        payload[k] = formData[k] ?? "";
      }
      const { error } = await supabase.from(tableName).insert(payload);
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

  // Load all keys from a sample row
  useEffect(() => {
    if (!isOpen) return;
    const load = async () => {
      const { data } = await supabase.from(tableName).select("*").limit(1);
      const sample = (data && data[0]) || {};
      const keys = Object.keys(sample).filter(
        (k) => k !== "updated_at" && k !== "deleted_at"
      );
      const ordered = [
        "dwid",
        "szname",
        ...keys.filter((k) => k !== "dwid" && k !== "szname"),
      ];
      setAllFields(ordered);
      const init: Record<string, string> = {};
      for (const k of ordered) init[k] = "";
      setFormData((prev) => ({ ...init, ...prev }));
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, supabase, tableName]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-4xl md:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>Create a new item entry</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TooltipProvider>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {allFields.map((key) => {
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
                    {key === "dwitemjob" ||
                    key === "dwitemkind1" ||
                    key === "dwitemkind2" ||
                    key === "dwitemkind3" ? (
                      <OptionsSelect
                        id={key}
                        value={formData[key] ?? ""}
                        onChange={(v) => handleInputChange(key, v)}
                        options={jobOptions}
                        placeholder="Select job"
                      />
                    ) : (
                      <Input
                        id={key}
                        value={formData[key] ?? ""}
                        onChange={(e) => handleInputChange(key, e.target.value)}
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
              {loading ? "Creating..." : "Create Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
