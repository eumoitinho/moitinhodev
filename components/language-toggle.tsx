"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
      aria-label="Toggle language"
      className="border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
    >
      <motion.div animate={{ scale: [0.8, 1] }} transition={{ duration: 0.3 }} className="relative">
        {language === "pt" ? "EN" : "PT"}
      </motion.div>
    </Button>
  )
}
