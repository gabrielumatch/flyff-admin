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
import type { TPropJob } from "@/types/database";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FieldHelpTooltip } from "@/components/field-help-tooltip";
import { getClassFieldDescription } from "@/lib/class-field-descriptions";
import { SearchableCombobox } from "@/components/searchable-combobox";
import { isSelectField, isHiddenField, isNumberField, getNumberFieldConstraints } from "@/utils/class-form-utils";

interface ClassAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  selectOptionsByField: Record<string, string[]>;
  selectPlaceholdersByField: Record<string, string>;
}

export function ClassAddModal({
  open,
  onOpenChange,
  onSuccess,
  selectOptionsByField,
  selectPlaceholdersByField,
}: ClassAddModalProps) {
  const { supabase } = useSupabase();
  const [formData, setFormData] = useState<Partial<TPropJob>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof TPropJob, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jobname || String(formData.jobname).trim() === "") {
      toast.error("Job name is required");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("propjob").insert({
        ...formData,
      });

      if (error) {
        console.error("Error creating class:", error);
        toast.error("Failed to create class");
        return;
      }

      toast.success("Class created");
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
      onOpenChange(false);
    }
  };

  // Get all class fields from the database schema
  const classFields: Array<keyof TPropJob> = [
    'jobname', 'attackspeed', 'maxhpscale', 'maxmpscale', 'maxfpscale',
    'defensescale', 'hprecoveryscale', 'mprecoveryscale', 'fprecoveryscale',
    'swd', 'axe', 'staff', 'stick', 'knuckle', 'wand', 'blocking', 'yoyo', 'critical'
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[80%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogDescription>Create a new job class entry</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TooltipProvider>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {classFields.map((field) => {
                if (isHiddenField(field)) return null;
                
                const key = String(field);
                const options = selectOptionsByField[key] || [];
                const placeholder = selectPlaceholdersByField[key] || `Enter ${key}`;

                return (
                  <div key={key} className="space-y-2">
                    <FieldHelpTooltip
                      label={<Label htmlFor={key}>{key}</Label>}
                      help={getClassFieldDescription(key)}
                    />
                    {isSelectField(field) && options.length > 0 ? (
                      <SearchableCombobox
                        options={options}
                        value={formData[field] || ""}
                        onValueChange={(value: string) => handleInputChange(field, value)}
                        placeholder={placeholder}
                        searchPlaceholder={`Search ${key}...`}
                        emptyMessage={`No ${key} options found.`}
                      />
                    ) : isNumberField(field) ? (
                      <Input
                        id={key}
                        type="number"
                        min={getNumberFieldConstraints(field)?.min}
                        max={getNumberFieldConstraints(field)?.max}
                        step={getNumberFieldConstraints(field)?.step}
                        value={formData[field] || ""}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        placeholder={placeholder}
                      />
                    ) : (
                      <Input
                        id={key}
                        value={formData[field] || ""}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        placeholder={placeholder}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </TooltipProvider>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Class"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
