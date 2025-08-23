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
import { SearchableCombobox } from "@/components/searchable-combobox";
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

  // Get all skill fields from the database schema
  const skillFields: Array<keyof TPropSkill> = [
    'ver', 'dwid', 'szname', 'dwnum', 'dwpackmax', 'dwitemkind1', 'dwitemkind2', 'dwitemkind3',
    'dwitemjob', 'bpermanence', 'dwuseable', 'dwitemsex', 'dwcost', 'dwendurance', 'nabrasion',
    'nhardness', 'dwhanded', 'dwheelh', 'dwparts', 'dwpartsub', 'bpartfile', 'dwexclusive',
    'dwbasepartsignore', 'dwitemlv', 'dwitemrare', 'dwshopable', 'blog', 'bcharged',
    'dwlinkkindbullet', 'dwlinkkind', 'dwabilitymin', 'dwabilitymax', 'eitemtype', 'witemeatk',
    'dwparry', 'dwblockrating', 'dwaddskillmin', 'dwaddskillmax', 'dwatkstyle', 'dwweapontype',
    'dwitematkorder1', 'dwitematkorder2', 'dwitematkorder3', 'dwitematkorder4', 'tmcontinuouspain',
    'dwshellquantity', 'dwrecoil', 'dwloadingtime', 'nadjhitrate', 'dwattackspeed', 'dwdmgshift',
    'dwattackrange', 'dwprobability', 'dwdestparam1', 'dwdestparam2', 'dwdestparam3',
    'nadjparamval1', 'nadjparamval2', 'nadjparamval3', 'dwchgparamval1', 'dwchgparamval2',
    'dwchgparamval3', 'dwdestdata1', 'dwdestdata2', 'dwdestdata3', 'dwactiveskill', 'dwactiveskilllv',
    'dwactiveskillper', 'dwreqmp', 'dwrepfp', 'dwreqdislv', 'dwreskill1', 'dwreskilllevel1',
    'dwreskill2', 'dwreskilllevel2', 'dwskillreadytype', 'dwskillready', 'dwskillrange',
    'dwsfxelemental', 'dwsfxobj', 'dwsfxobj2', 'dwsfxobj3', 'dwsfxobj4', 'dwsfxobj5',
    'dwusemotion', 'dwcircletime', 'dwskilltime', 'dwexetarget', 'dwusechance', 'dwspellregion',
    'dwspelltype', 'dwreferstat1', 'dwreferstat2', 'dwrefertarget1', 'dwrefertarget2',
    'dwrefervalue1', 'dwrefervalue2', 'dwskilltype', 'fitemresistelecricity', 'fitemresistfire',
    'fitemresistwind', 'fitemresistwater', 'fitemresistearth', 'nevildoing', 'dwexpertlv',
    'expertmax', 'dwsubdefine', 'dwexp', 'dwcombostyle', 'fflightspeed', 'fflightlrangle',
    'fflighttbangle', 'dwflightlimit', 'dwffuelremax', 'dwafuelremax', 'dwfuelre', 'dwlimitlevel1',
    'dwreflect', 'dwsndattack1', 'dwsndattack2', 'szicon', 'dwquestid', 'sztextfile', 'szcomment',
    'dwbuffticktype'
  ];

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
              {loading ? "Creating..." : "Create Skill"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
