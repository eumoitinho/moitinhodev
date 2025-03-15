"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

export function ProjectFilter() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState("Todos")

  const filters = [
    { id: "Todos", label: t("all") },
    { id: "Web", label: "Web" },
    { id: "React", label: "React" },
    { id: "Design", label: "Design" },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {filters &&
        filters.map((filter) => (
          <motion.div key={filter.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={
                activeFilter === filter.id
                  ? "rounded-full bg-indigo-500 hover:bg-indigo-600"
                  : "rounded-full border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
              }
            >
              {filter.label}
            </Button>
          </motion.div>
        ))}
    </div>
  )
}

