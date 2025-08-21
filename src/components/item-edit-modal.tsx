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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ItemEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: ItemRecord | null;
  tableName: string;
  onSuccess: () => void;
  jobOptions: string[];
}

export function ItemEditModal({
  isOpen,
  onClose,
  record,
  tableName,
  onSuccess,
  jobOptions,
}: ItemEditModalProps) {
  const { supabase } = useSupabase();
  const [formData, setFormData] = useState<Partial<ItemRecord>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (record) setFormData(record);
  }, [record]);

  const handleInputChange = (field: keyof ItemRecord, value: string) => {
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

  const fields = Object.keys(record) as Array<keyof ItemRecord>;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-6xl md:max-w-7xl max-h-[90vh] overflow-y-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                    {key === "dwitemjob" ? (
                      <Select
                        value={(formData[field] as string) ?? ""}
                        onValueChange={(v) => handleInputChange(field, v)}
                      >
                        <SelectTrigger
                          id={key}
                          className="w-full min-w-[200px]"
                        >
                          <SelectValue placeholder="Select job" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobOptions.map((j) => (
                            <SelectItem key={j} value={j}>
                              {j}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
