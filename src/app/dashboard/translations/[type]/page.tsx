import { TranslationTable } from "@/components/translation-table"
import { TRANSLATION_CONFIG, TranslationType } from "@/lib/translation-config"
import { notFound } from "next/navigation"

interface TranslationPageProps {
  params: {
    type: string
  }
}

export default function TranslationPage({ params }: TranslationPageProps) {
  const { type } = params
  
  // Check if the translation type is valid
  if (!(type in TRANSLATION_CONFIG)) {
    notFound()
  }

  const config = TRANSLATION_CONFIG[type as TranslationType]

  return (
    <TranslationTable
      tableName={config.tableName}
      title={config.title}
      description={config.description}
    />
  )
}
