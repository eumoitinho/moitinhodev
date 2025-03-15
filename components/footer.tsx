"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, DribbbleIcon as Behance } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-black py-12 border-t border-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold mb-4 inline-block text-white">
              <span className="text-indigo-400">eu</span>moitinho<span className="text-indigo-400">&lt;/&gt;</span>
            </Link>
            <p className="text-gray-300 max-w-md mb-6">
              Desenvolvedor web full stack apaixonado por criar aplicações web interativas e responsivas, com
              experiência em design gráfico e criação de identidade visual.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/eumoitinho"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-indigo-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/joaomoitinho"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://behance.net/joaomoitinho"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-indigo-400 transition-colors"
                aria-label="Behance"
              >
                <Behance className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:joao.moitinho@outlook.com"
                className="text-gray-300 hover:text-indigo-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-indigo-400">{t("navigation")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  {t("skills")}
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  {t("projects")}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-indigo-400">{t("services")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  {t("webDevelopment")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  {t("uiuxDesign")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  {t("graphicDesign")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  {t("visualIdentity")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  {t("motionGraphics")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} João Moitinho. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}

