'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useSupabase } from "./supabase-provider"
import { toast } from "sonner"

interface TranslationRecord {
  szname: string
  lang_10_pt?: string
  lang_1_us?: string
  lang_7_es?: string
  lang_0_kr?: string
  lang_2_jp?: string
  lang_3_cn?: string
  lang_4_th?: string
  lang_5_tw?: string
  lang_6_de?: string
  lang_8_fr?: string
  lang_9_hk?: string
  lang_11_vn?: string
  lang_12_ru?: string
  lang_13_ph?: string
  lang_14_id?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

interface TranslationEditModalProps {
  isOpen: boolean
  onClose: () => void
  record: TranslationRecord | null
  tableName: string
  onSuccess: () => void
}

const LANGUAGES = [
  { code: '10_pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: '1_us', name: 'English', flag: '🇺🇸' },
  { code: '7_es', name: 'Spanish', flag: '🇪🇸' },
  { code: '0_kr', name: 'Korean', flag: '🇰🇷' },
  { code: '2_jp', name: 'Japanese', flag: '🇯🇵' },
  { code: '3_cn', name: 'Chinese', flag: '🇨🇳' },
  { code: '4_th', name: 'Thai', flag: '🇹🇭' },
  { code: '5_tw', name: 'Taiwanese', flag: '🇹🇼' },
  { code: '6_de', name: 'German', flag: '🇩🇪' },
  { code: '8_fr', name: 'French', flag: '🇫🇷' },
  { code: '9_hk', name: 'Hong Kong', flag: '🇭🇰' },
  { code: '11_vn', name: 'Vietnamese', flag: '🇻🇳' },
  { code: '12_ru', name: 'Russian', flag: '🇷🇺' },
  { code: '13_ph', name: 'Filipino', flag: '🇵🇭' },
  { code: '14_id', name: 'Indonesian', flag: '🇮🇩' },
]

export function TranslationEditModal({ 
  isOpen, 
  onClose, 
  record, 
  tableName, 
  onSuccess 
}: TranslationEditModalProps) {
  const { supabase } = useSupabase()
  const [formData, setFormData] = useState<Partial<TranslationRecord>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (record) {
      setFormData(record)
    }
  }, [record])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!record) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from(tableName)
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('szname', record.szname)

      if (error) {
        console.error('Error updating record:', error)
        toast.error('Failed to update translation')
        return
      }

      toast.success('Translation updated successfully')
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
    }
  }

  if (!record) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Translation</DialogTitle>
          <DialogDescription>
            Update translation for: <strong>{record.szname}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name field (read-only) */}
          <div className="space-y-2">
            <Label htmlFor="szname">Name</Label>
            <Input
              id="szname"
              value={record.szname}
              disabled
              className="bg-muted"
            />
          </div>

          {/* Language fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LANGUAGES.map((lang) => {
              const fieldName = `lang_${lang.code}` as keyof TranslationRecord
              return (
                <div key={lang.code} className="space-y-2">
                  <Label htmlFor={fieldName} className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </Label>
                  <Textarea
                    id={fieldName}
                    value={formData[fieldName] || ''}
                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                    placeholder={`Enter ${lang.name} translation...`}
                    rows={3}
                  />
                </div>
              )
            })}
          </div>

          {/* Action buttons */}
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
              {loading ? 'Updating...' : 'Update Translation'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
