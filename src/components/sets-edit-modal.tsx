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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSupabase } from "./supabase-provider";
import { toast } from "sonner";
import type { TPropItemEtcItem } from "@/types/database";
import { OptionsSelect } from "@/components/options-select";
import { Plus, Trash2 } from "lucide-react";

interface SetsEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  record: TPropItemEtcItem | null;
  selectOptionsByField: Record<string, string[]>;
  selectPlaceholdersByField: Record<string, string>;
}

interface Element {
  name: string;
  part: string;
}

interface Bonus {
  attribute: string;
  value: number;
  parts: number;
}

export function SetsEditModal({
  open,
  onOpenChange,
  onSuccess,
  record,
  selectOptionsByField,
  selectPlaceholdersByField,
}: SetsEditModalProps) {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState(false);
  
  // Basic info
  const [setNumber, setSetNumber] = useState<string>('');
  const [setName, setSetName] = useState<string>('');
  
  // Dynamic arrays
  const [elements, setElements] = useState<Element[]>([]);
  const [bonuses, setBonuses] = useState<Bonus[]>([]);

  // Initialize form data when record changes
  useEffect(() => {
    if (record) {
      setSetNumber(record.num?.toString() || '');
      setSetName(record.name_propitemetc || '');
      
      // Extract elements
      const extractedElements: Element[] = [];
      for (let i = 1; i <= 8; i++) {
        const name = record[`elem_${i}_name` as keyof TPropItemEtcItem] as string;
        const part = record[`elem_${i}_part` as keyof TPropItemEtcItem] as string;
        if (name) {
          extractedElements.push({ name, part: part || '' });
        }
      }
      setElements(extractedElements);
      
             // Extract bonuses
       const extractedBonuses: Bonus[] = [];
       for (let i = 1; i <= 8; i++) {
         const attribute = record[`avail_${i}_dst` as keyof TPropItemEtcItem] as string;
         const value = record[`avail_${i}_value` as keyof TPropItemEtcItem] as number;
         const parts = record[`avail_${i}_required_pieces` as keyof TPropItemEtcItem] as number;
         if (attribute) {
           extractedBonuses.push({ 
             attribute, 
             value: value || 0, 
             parts: parts || 0 
           });
         }
       }
      setBonuses(extractedBonuses);
    }
  }, [record]);

  const addElement = () => {
    setElements([...elements, { name: '', part: '' }]);
  };

  const removeElement = (index: number) => {
    setElements(elements.filter((_, i) => i !== index));
  };

  const updateElement = (index: number, field: keyof Element, value: string) => {
    const newElements = [...elements];
    newElements[index] = { ...newElements[index], [field]: value };
    setElements(newElements);
  };

  const addBonus = () => {
    setBonuses([...bonuses, { attribute: '', value: 0, parts: 0 }]);
  };

  const removeBonus = (index: number) => {
    setBonuses(bonuses.filter((_, i) => i !== index));
  };

  const updateBonus = (index: number, field: keyof Bonus, value: string | number) => {
    const newBonuses = [...bonuses];
    newBonuses[index] = { ...newBonuses[index], [field]: value };
    setBonuses(newBonuses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!record || !setNumber || setNumber.trim() === "") {
      toast.error("Set number is required");
      return;
    }

    setLoading(true);
    try {
      // Build the data object
      const formData: Partial<TPropItemEtcItem> = {
        num: parseInt(setNumber),
        name_propitemetc: setName,
      };

      // Add elements
      elements.forEach((element, index) => {
        if (element.name) {
          (formData as Record<string, unknown>)[`elem_${index + 1}_name`] = element.name;
          (formData as Record<string, unknown>)[`elem_${index + 1}_part`] = element.part;
        }
      });

      // Add bonuses
      bonuses.forEach((bonus, index) => {
        if (bonus.attribute) {
          (formData as Record<string, unknown>)[`avail_${index + 1}_dst`] = bonus.attribute;
          (formData as Record<string, unknown>)[`avail_${index + 1}_value`] = bonus.value;
          (formData as Record<string, unknown>)[`avail_${index + 1}_required_pieces`] = bonus.parts;
        }
      });

      const { error } = await supabase
        .from("propitemetc_item")
        .update(formData)
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
      onOpenChange(false);
    }
  };

  if (!record) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-4xl md:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Set</DialogTitle>
          <DialogDescription>
            Update the equipment set with elements and bonuses.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="setNumber">
                  Set Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="setNumber"
                  type="number"
                  value={setNumber}
                  onChange={(e) => setSetNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="setName">Set Name</Label>
                <Input
                  id="setName"
                  type="text"
                  value={setName}
                  onChange={(e) => setSetName(e.target.value)}
                  placeholder="e.g., IDS_PROPITEMETC_INC_000022"
                />
              </div>
            </div>
          </div>

          {/* Elements Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-lg font-semibold">Elements</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addElement}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Element
              </Button>
            </div>
            
            {elements.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No elements added. Click &ldquo;Add Element&rdquo; to get started.
              </div>
            ) : (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Part</TableHead>
                      <TableHead className="w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {elements.map((element, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <Input
                            value={element.name}
                            onChange={(e) => updateElement(index, 'name', e.target.value)}
                            placeholder="Item name or ID"
                          />
                        </TableCell>
                        <TableCell>
                          <OptionsSelect
                            id={`element-part-${index}`}
                            options={selectOptionsByField['elem_part'] || []}
                            placeholder="Select part"
                            value={element.part}
                            onChange={(value) => updateElement(index, 'part', value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeElement(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          {/* Bonuses Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-lg font-semibold">Bonuses</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addBonus}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Bonus
              </Button>
            </div>
            
            {bonuses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No bonuses added. Click &ldquo;Add Bonus&rdquo; to get started.
              </div>
            ) : (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Attribute</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Parts</TableHead>
                      <TableHead className="w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bonuses.map((bonus, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <OptionsSelect
                            id={`bonus-attribute-${index}`}
                            options={selectOptionsByField['avail_dst'] || []}
                            placeholder="Select attribute"
                            value={bonus.attribute}
                            onChange={(value) => updateBonus(index, 'attribute', value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={bonus.value}
                            onChange={(e) => updateBonus(index, 'value', parseInt(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={bonus.parts}
                            onChange={(e) => updateBonus(index, 'parts', parseInt(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBonus(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
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
