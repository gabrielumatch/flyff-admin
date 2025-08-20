'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useSupabase } from "./supabase-provider"
import { toast } from "sonner"

interface TranslationAddModalProps {
  isOpen: boolean
  onClose: () => void
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

export function TranslationAddModal({ 
  isOpen, 
  onClose, 
  tableName, 
  onSuccess 
}: TranslationAddModalProps) {
  const { supabase } = useSupabase()
  const [formData, setFormData] = useState<Record<string, string>>({
    szname: '',
    lang_10_pt: '',
    lang_1_us: '',
    lang_7_es: '',
    lang_0_kr: '',
    lang_2_jp: '',
    lang_3_cn: '',
    lang_4_th: '',
    lang_5_tw: '',
    lang_6_de: '',
    lang_8_fr: '',
    lang_9_hk: '',
    lang_11_vn: '',
    lang_12_ru: '',
    lang_13_ph: '',
    lang_14_id: '',
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.szname.trim()) {
      toast.error('Name is required')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from(tableName)
        .insert({
          ...formData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error creating record:', error)
        if (error.code === '23505') {
          toast.error('A translation with this name already exists')
        } else {
          toast.error('Failed to create translation')
        }
        return
      }

      toast.success('Translation created successfully')
      onSuccess()
      handleClose()
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      // Reset form data
      setFormData({
        szname: '',
        lang_10_pt: '',
        lang_1_us: '',
        lang_7_es: '',
        lang_0_kr: '',
        lang_2_jp: '',
        lang_3_cn: '',
        lang_4_th: '',
        lang_5_tw: '',
        lang_6_de: '',
        lang_8_fr: '',
        lang_9_hk: '',
        lang_11_vn: '',
        lang_12_ru: '',
        lang_13_ph: '',
        lang_14_id: '',
      })
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Translation</DialogTitle>
          <DialogDescription>
            Create a new translation entry
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name field */}
          <div className="space-y-2">
            <Label htmlFor="szname">Name *</Label>
            <Input
              id="szname"
              value={formData.szname}
              onChange={(e) => handleInputChange('szname', e.target.value)}
              placeholder="Enter translation name..."
              required
            />
          </div>

          {/* Language fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LANGUAGES.map((lang) => {
              const fieldName = `lang_${lang.code}`
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
              {loading ? 'Creating...' : 'Create Translation'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
