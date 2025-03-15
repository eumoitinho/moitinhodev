"use client"

import { useLanguage } from "@/contexts/language-context"
import { translations, type LanguageKey } from "@/translations"

export function useTranslation() {
  const { language } = useLanguage()

  const t = (key: LanguageKey) => {
    return translations[language][key] || key
  }

  return { t, language }
}

