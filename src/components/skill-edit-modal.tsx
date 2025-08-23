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
import type { TPropSkill } from "@/types/database";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FieldHelpTooltip } from "@/components/field-help-tooltip";
import { getSkillFieldDescription } from "@/lib/skill-field-descriptions";

interface SkillEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: TPropSkill | null;
  tableName: string;
  onSuccess: () => void;
  allFields: Array<keyof TPropSkill>;
}

export function SkillEditModal({
  isOpen,
  onClose,
  record,
  tableName,
  onSuccess,
  allFields,
}: SkillEditModalProps) {
  const { supabase } = useSupabase();
  const [formData, setFormData] = useState<Partial<TPropSkill>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (record) setFormData(record);
  }, [record]);

  const handleInputChange = (field: keyof TPropSkill, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!record) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from(tableName)
        .update({
          ...formData,
        })
        .eq("dwid", record.dwid);

      if (error) {
        console.error("Error updating skill:", error);
        toast.error("Failed to update skill");
        return;
      }

      toast.success("Skill updated");
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-6xl md:max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Skill</DialogTitle>
          <DialogDescription>
            Update skill: <strong>{record.szname ?? record.dwid}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TooltipProvider>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {allFields.map((field) => {
                const key = String(field);
                return (
                  <div key={key} className="space-y-2">
                    <FieldHelpTooltip
                      label={<Label htmlFor={key}>{key}</Label>}
                      help={getSkillFieldDescription(key)}
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
              {loading ? "Updating..." : "Update Skill"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
