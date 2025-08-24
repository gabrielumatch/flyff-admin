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
import type { TPropMover } from "@/types/database";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FieldHelpTooltip } from "@/components/field-help-tooltip";
import { getMonsterFieldDescription } from "@/lib/monster-field-descriptions";
import { SearchableCombobox } from "@/components/searchable-combobox";
import { isSelectField, isHiddenField } from "@/utils/monster-form-utils";

interface MonsterEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: TPropMover;
  onSuccess: () => void;
  selectOptionsByField: Record<string, string[]>;
  selectPlaceholdersByField: Record<string, string>;
}

export function MonsterEditModal({
  open,
  onOpenChange,
  record,
  onSuccess,
  selectOptionsByField,
  selectPlaceholdersByField,
}: MonsterEditModalProps) {
  const { supabase } = useSupabase();
  const [formData, setFormData] = useState<Partial<TPropMover>>({});
  const [loading, setLoading] = useState(false);

  // Initialize form data when record changes
  useEffect(() => {
    setFormData(record);
  }, [record]);

  const handleInputChange = (field: keyof TPropMover, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from("propmover")
        .update(formData)
        .eq("dwid", record.dwid);

      if (error) {
        console.error("Error updating monster:", error);
        toast.error("Failed to update monster");
        return;
      }

      toast.success("Monster updated");
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
      setFormData(record);
      onOpenChange(false);
    }
  };

  // Get all monster fields from the database schema
  const monsterFields: Array<keyof TPropMover> = [
    'dwid', 'szname', 'dwai', 'dwstr', 'dwsta', 'dwdex', 'dwint', 'dwhr', 'dwer',
    'dwrace', 'dwbelligerence', 'dwgender', 'dwlevel', 'dwfilghtlevel', 'dwsize',
    'dwclass', 'bifpart', 'dwkarma', 'dwuseable', 'dwactionradius', 'dwatkmin',
    'dwatkmax', 'dwatk1', 'dwatk2', 'dwatk3', 'dwhorizontalrate', 'dwverticalrate',
    'dwdiagonalrate', 'dwthrustrate', 'dwchestrate', 'dwheadrate', 'dwarmrate',
    'dwlegrate', 'dwattackspeed', 'dwreattackdelay', 'dwaddhp', 'dwaddmp',
    'dwnaturealarmor', 'nabrasion', 'nhardness', 'dwadjatkdelay', 'eelementtype',
    'welementatk', 'dwhidelevel', 'fspeed', 'dwshelter', 'bflying', 'dwjumping',
    'dwairjump', 'btaming', 'dwresismagic', 'fresistelecricity', 'fresistfire',
    'fresistwind', 'fresistwater', 'fresistearth', 'dwcash', 'dwsourcematerial',
    'dwmaterialamount', 'dwcohesion', 'dwholdingtime', 'dwcorrectionvalue',
    'dwexpvalue', 'nfxpvalue', 'nbodystate', 'dwaddability', 'bkillable',
    'dwvirtitem1', 'dwvirttype1', 'dwvirtitem2', 'dwvirttype2', 'dwvirtitem3',
    'dwvirttype3', 'dwsndatk1', 'dwsndatk2', 'dwsnddie1', 'dwsnddie2', 'dwsnddmg1',
    'dwsnddmg2', 'dwsnddmg3', 'dwsndidle1', 'dwsndidle2', 'szcomment'
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-6xl md:max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Monster</DialogTitle>
          <DialogDescription>Edit monster entry: {record.szname}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TooltipProvider>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {monsterFields.map((field) => {
                if (isHiddenField(field)) return null;
                
                const key = String(field);
                const options = selectOptionsByField[key] || [];
                const placeholder = selectPlaceholdersByField[key] || `Enter ${key}`;

                return (
                  <div key={key} className="space-y-2">
                    <FieldHelpTooltip
                      label={<Label htmlFor={key}>{key}</Label>}
                      help={getMonsterFieldDescription(key)}
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
              {loading ? "Updating..." : "Update Monster"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
