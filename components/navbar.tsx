"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { useTranslation } from "@/hooks/use-translation"

export function Navbar() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "contact"]

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="text-2xl font-bold text-white">
              <span className="text-indigo-400">eu</span>moitinho<span className="text-indigo-400">&lt;/&gt;</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                href="#about"
                className={`text-sm hover:text-indigo-400 transition-colors text-white ${
                  activeSection === "about" ? "text-indigo-400 font-medium" : ""
                }`}
              >
                {t("about")}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="#skills"
                className={`text-sm hover:text-indigo-400 transition-colors text-white ${
                  activeSection === "skills" ? "text-indigo-400 font-medium" : ""
                }`}
              >
                {t("skills")}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="#projects"
                className={`text-sm hover:text-indigo-400 transition-colors text-white ${
                  activeSection === "projects" ? "text-indigo-400 font-medium" : ""
                }`}
              >
                {t("projects")}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="#contact"
                className={`text-sm hover:text-indigo-400 transition-colors text-white ${
                  activeSection === "contact" ? "text-indigo-400 font-medium" : ""
                }`}
              >
                {t("contact")}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <LanguageToggle />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className="bg-indigo-500 hover:bg-indigo-600">
                <Link href="#contact">{t("hire")}</Link>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageToggle />
            <button
              className="focus:outline-none text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md shadow-md"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              <Link
                href="#about"
                className={`text-white text-sm hover:text-indigo-400 transition-colors py-2 ${
                  activeSection === "about" ? "text-indigo-400 font-medium" : ""
                }`}
                onClick={closeMenu}
              >
                {t("about")}
              </Link>
              <Link
                href="#skills"
                className={`text-white text-sm hover:text-indigo-400 transition-colors py-2 ${
                  activeSection === "skills" ? "text-indigo-400 font-medium" : ""
                }`}
                onClick={closeMenu}
              >
                {t("skills")}
              </Link>
              <Link
                href="#projects"
                className={`text-white text-sm hover:text-indigo-400 transition-colors py-2 ${
                  activeSection === "projects" ? "text-indigo-400 font-medium" : ""
                }`}
                onClick={closeMenu}
              >
                {t("projects")}
              </Link>
              <Link
                href="#contact"
                className={`text-white text-sm hover:text-indigo-400 transition-colors py-2 ${
                  activeSection === "contact" ? "text-indigo-400 font-medium" : ""
                }`}
                onClick={closeMenu}
              >
                {t("contact")}
              </Link>
              <Button asChild className="w-full bg-indigo-500 hover:bg-indigo-600" onClick={closeMenu}>
                <Link href="#contact">{t("hire")}</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

