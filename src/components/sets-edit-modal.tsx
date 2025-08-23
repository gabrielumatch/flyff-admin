"use client";

import { useState, useEffect } from "react";
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
import type { TPropItemEtcItem } from "@/types/database";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FieldHelpTooltip } from "@/components/field-help-tooltip";
import { OptionsSelect } from "@/components/options-select";

interface SetsEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: TPropItemEtcItem | null;
  onSuccess: () => void;
  selectOptionsByField: Record<string, string[]>;
  selectPlaceholdersByField: Record<string, string>;
}

export function SetsEditModal({
  open,
  onOpenChange,
  record,
  onSuccess,
  selectOptionsByField,
  selectPlaceholdersByField,
}: SetsEditModalProps) {
  const { supabase } = useSupabase();
  const [formData, setFormData] = useState<Partial<TPropItemEtcItem>>({});
  const [loading, setLoading] = useState(false);

  // Initialize form data when record changes
  useEffect(() => {
    if (record) {
      setFormData(record);
    }
  }, [record]);

  const handleInputChange = (field: keyof TPropItemEtcItem, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!record) return;

    if (!formData.num || String(formData.num).trim() === "") {
      toast.error("Set number is required");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("propitemetc_item")
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', record.id);

      if (error) {
        console.error("Error updating set:", error);
        toast.error("Failed to update set");
        return;
      }

      toast.success("Set updated successfully");
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

  if (!record) return null;

  // Define the form fields for sets
  const formFields: Array<{
    name: string;
    label: string;
    type: 'text' | 'number' | 'select';
    required: boolean;
    options?: string;
  }> = [
    { name: 'num', label: 'Set Number', type: 'number', required: true },
    { name: 'name_propitemetc', label: 'Set Name', type: 'text', required: false },
  ];

  // Add element fields (1-8)
  for (let i = 1; i <= 8; i++) {
    formFields.push(
      { name: `elem_${i}_name`, label: `Element ${i} Name`, type: 'text', required: false },
      { name: `elem_${i}_part`, label: `Element ${i} Part`, type: 'select', required: false, options: 'elem_part' }
    );
  }

  // Add available bonus fields (1-8)
  for (let i = 1; i <= 8; i++) {
    formFields.push(
      { name: `avail_${i}_dst`, label: `Bonus ${i} Type`, type: 'select', required: false, options: 'avail_dst' },
      { name: `avail_${i}_value`, label: `Bonus ${i} Value`, type: 'number', required: false },
      { name: `avail_${i}_required_pieces`, label: `Bonus ${i} Required Pieces`, type: 'number', required: false }
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Set</DialogTitle>
          <DialogDescription>
            Update the equipment set with elements and bonuses.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              {formFields.slice(0, 2).map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    value={formData[field.name as keyof TPropItemEtcItem] || ''}
                    onChange={(e) => handleInputChange(field.name as keyof TPropItemEtcItem, e.target.value)}
                    required={field.required}
                  />
                </div>
              ))}
            </div>

            {/* Elements Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Elements (1-4)</h3>
              
              {formFields.slice(2, 10).map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === 'select' ? (
                    <OptionsSelect
                      options={selectOptionsByField[field.options || ''] || []}
                      placeholder={selectPlaceholdersByField[field.options || ''] || `Select ${field.label}`}
                      value={formData[field.name as keyof TPropItemEtcItem] || ''}
                      onValueChange={(value) => handleInputChange(field.name as keyof TPropItemEtcItem, value)}
                    />
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      value={formData[field.name as keyof TPropItemEtcItem] || ''}
                      onChange={(e) => handleInputChange(field.name as keyof TPropItemEtcItem, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Elements 5-8 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Elements (5-8)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formFields.slice(10, 18).map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === 'select' ? (
                    <OptionsSelect
                      options={selectOptionsByField[field.options || ''] || []}
                      placeholder={selectPlaceholdersByField[field.options || ''] || `Select ${field.label}`}
                      value={formData[field.name as keyof TPropItemEtcItem] || ''}
                      onValueChange={(value) => handleInputChange(field.name as keyof TPropItemEtcItem, value)}
                    />
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      value={formData[field.name as keyof TPropItemEtcItem] || ''}
                      onChange={(e) => handleInputChange(field.name as keyof TPropItemEtcItem, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bonuses 1-4 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bonuses (1-4)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formFields.slice(18, 30).map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === 'select' ? (
                    <OptionsSelect
                      options={selectOptionsByField[field.options || ''] || []}
                      placeholder={selectPlaceholdersByField[field.options || ''] || `Select ${field.label}`}
                      value={formData[field.name as keyof TPropItemEtcItem] || ''}
                      onValueChange={(value) => handleInputChange(field.name as keyof TPropItemEtcItem, value)}
                    />
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      value={formData[field.name as keyof TPropItemEtcItem] || ''}
                      onChange={(e) => handleInputChange(field.name as keyof TPropItemEtcItem, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bonuses 5-8 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bonuses (5-8)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formFields.slice(30, 42).map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === 'select' ? (
                    <OptionsSelect
                      options={selectOptionsByField[field.options || ''] || []}
                      placeholder={selectPlaceholdersByField[field.options || ''] || `Select ${field.label}`}
                      value={formData[field.name as keyof TPropItemEtcItem] || ''}
                      onValueChange={(value) => handleInputChange(field.name as keyof TPropItemEtcItem, value)}
                    />
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      value={formData[field.name as keyof TPropItemEtcItem] || ''}
                      onChange={(e) => handleInputChange(field.name as keyof TPropItemEtcItem, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Set"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
