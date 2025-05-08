"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Github, DribbbleIcon as Behance } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageSrc: string
  link: string
  githubLink?: string
  behanceLink?: string
  delay?: number
}

export function ProjectCard({
  title,
  description,
  tags = [],
  imageSrc,
  link,
  githubLink,
  behanceLink,
  delay = 0,
}: ProjectCardProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-700 h-full flex flex-col"
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={
              imageSrc ||
              `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzg4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+JHt0aXRsZSB8fCAiUHJvamVjdCJ9PC90ZXh0Pjwvc3ZnPg==`
            }
            alt={title || "Project"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 text-white">{title || "Untitled Project"}</h3>
          <p className="text-gray-300 mb-4 flex-grow">{description || "No description available"}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags &&
              tags.map((tag, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">
                  {tag}
                </span>
              ))}
          </div>
          <div className="flex gap-2 mt-auto">
            {link && link !== "/" && (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="flex-1 border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
              >
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  {t("viewProject")}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            {githubLink && githubLink !== "/" && (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="flex-1 border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
              >
                <Link
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  GitHub
                  <Github className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            {behanceLink && behanceLink !== "/" && (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="flex-1 border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
              >
                <Link
                  href={behanceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Behance
                  <Behance className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
