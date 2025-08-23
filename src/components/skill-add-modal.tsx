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
import type { TPropSkill } from "@/types/database";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FieldHelpTooltip } from "@/components/field-help-tooltip";
import { getSkillFieldDescription } from "@/lib/skill-field-descriptions";
import { OptionsSelect } from "@/components/options-select";
import { isSelectField, isHiddenField } from "@/utils/skill-form-utils";

interface SkillAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  selectOptionsByField: Record<string, string[]>;
  selectPlaceholdersByField: Record<string, string>;
}

export function SkillAddModal({
  open,
  onOpenChange,
  onSuccess,
  selectOptionsByField,
  selectPlaceholdersByField,
}: SkillAddModalProps) {
  const { supabase } = useSupabase();
  const [formData, setFormData] = useState<Partial<TPropSkill>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof TPropSkill, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dwid || String(formData.dwid).trim() === "") {
      toast.error("dwid is required");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("propskill").insert({
        ...formData,
      });

      if (error) {
        console.error("Error creating skill:", error);
        toast.error("Failed to create skill");
        return;
      }

      toast.success("Skill created");
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

  // Get all skill fields dynamically
  const skillFields = Object.keys(selectOptionsByField) as Array<keyof TPropSkill>;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-6xl md:max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
          <DialogDescription>Create a new skill entry</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TooltipProvider>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {skillFields.map((field) => {
                if (isHiddenField(field)) return null;
                
                const key = String(field);
                const options = selectOptionsByField[key] || [];
                const placeholder = selectPlaceholdersByField[key] || `Enter ${key}`;

                return (
                  <div key={key} className="space-y-2">
                    <FieldHelpTooltip
                      label={<Label htmlFor={key}>{key}</Label>}
                      help={getSkillFieldDescription(key)}
                    />
                    {isSelectField(field) && options.length > 0 ? (
                      <OptionsSelect
                        id={key}
                        value={formData[field] || ""}
                        onChange={(value: string) => handleInputChange(field, value)}
                        placeholder={placeholder}
                        options={options}
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
              {loading ? "Creating..." : "Create Skill"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
