"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, Github, Linkedin, Mail, Download, DribbbleIcon as Behance } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBar } from "@/components/skill-bar"
import { ContactForm } from "@/components/contact-form"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedText } from "@/components/animated-text"
import { CursorFollower } from "@/components/cursor-follower"
import { ProjectFilter } from "@/components/project-filter"
import { ScrollToTop } from "@/components/scroll-to-top"
import { projects } from "@/data/projects"
import { skills } from "@/data/skills"
import { useTranslation } from "@/hooks/use-translation"

export default function Home() {
  const { t, language } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main className="relative">
      <CursorFollower />
      <ScrollToTop />

      {/* Hero Section */}
      <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              <Image src="/images/www.png" alt="Background" fill className="object-cover" priority />
            </div>
          </div>
          <div className="absolute inset-0 bg-black/30 dark:bg-black/60" />
        </motion.div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-2xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight">
                  <span className="text-indigo-400">{t("greeting")}</span>
                </h1>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                  <AnimatedText text="João" />
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">{t("heroDescription")}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild size="lg" className="group bg-indigo-500 hover:bg-indigo-600">
                  <Link href="#contact">
                    {t("hire")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link
                    href={language === "pt" ? "/curriculo.pdf" : "/resume.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("downloadCV")}
                  </Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 md:mt-0"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-gray-900">
                <Image src="/images/heroimage.png" alt="João Moitinho" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center items-start p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <h3 className="text-4xl font-bold text-indigo-400 mb-2">
                <AnimatedCounter from={0} to={6} duration={2} />+
              </h3>
              <p className="text-sm text-gray-300">{t("devProjects")}</p>
            </div>

            <div className="p-6">
              <h3 className="text-4xl font-bold text-indigo-400 mb-2">
                <AnimatedCounter from={0} to={100} duration={2} />~
              </h3>
              <p className="text-sm text-gray-300">{t("designProjects")}</p>
            </div>

            <div className="p-6">
              <h3 className="text-4xl font-bold text-indigo-400 mb-2">
                <AnimatedCounter from={0} to={2} duration={2} />
              </h3>
              <p className="text-sm text-gray-300">{t("achievements")}</p>
            </div>

            <div className="p-6">
              <h3 className="text-4xl font-bold text-indigo-400 mb-2">
                <AnimatedCounter from={0} to={5} duration={2} />
              </h3>
              <p className="text-sm text-gray-300">{t("years")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                {t("about")} <span className="text-indigo-400">{t("aboutMe").split(" ")[1]}</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-md"
            >
              <div className="absolute inset-0">
                <div className="relative w-full h-full">
                  <Image src="/images/aboutme.png" alt="João Moitinho" fill className="object-cover" />
                </div>
              </div>
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-6">{t("myJourney")}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{t("aboutDescription1")}</p>
                <p className="text-gray-300 mb-8 leading-relaxed">{t("aboutDescription2")}</p>
              </motion.div>

              <div className="flex gap-4">
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
                  >
                    <Link
                      href="https://github.com/eumoitinho"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
                  >
                    <Link
                      href="https://linkedin.com/in/eumoitinho"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
                  >
                    <Link
                      href="https://behance.net/joaomoitinh1"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Behance"
                    >
                      <Behance className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
                  >
                    <Link href="mailto:moitinhoeu@icloud.com" aria-label="Email">
                      <Mail className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
                  >
                    <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download Resume">
                      <Download className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 md:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                {t("mySkills").split(" ")[0]} <span className="text-indigo-400">{t("mySkills").split(" ")[1]}</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-gray-300 mb-8 leading-relaxed">{t("skillsDescription")}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              {skills.slice(0, 4).map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} delay={0.1 * (index + 1)} />
              ))}
            </div>
            <div className="space-y-6">
              {skills.slice(4, 8).map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} delay={0.1 * (index + 5)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-32 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                {t("myProjects").split(" ")[0]} <span className="text-indigo-400">{t("myProjects").split(" ")[1]}</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-gray-300 mb-8 leading-relaxed">{t("projectsDescription")}</p>
            </motion.div>

            <ProjectFilter />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tag}
                imageSrc={project.imageSrc}
                link={project.previewUrl}
                githubLink={project.tag.includes("Design") ? undefined : project.gitUrl}
                behanceLink={project.tag.includes("Design") ? project.previewUrl : undefined}
                delay={0.1 * (index + 1)}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <Button
                asChild
                variant="outline"
                className="group border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
              >
                <Link href="/projects" className="flex items-center">
                  {t("viewAllProjects")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                {t("getInTouch").split(" ")[0]}{" "}
                <span className="text-indigo-400">
                  {t("getInTouch").split(" ")[1]} {t("getInTouch").split(" ")[2]}
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-gray-300 mb-8 leading-relaxed">{t("contactDescription")}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">{t("contactInfo")}</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-1 text-indigo-400" />
                  <div>
                    <h4 className="font-medium">{t("email")}</h4>
                    <p className="text-gray-300">moitinhoeu@icloud.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Linkedin className="h-5 w-5 mr-3 mt-1 text-indigo-400" />
                  <div>
                    <h4 className="font-medium">LinkedIn</h4>
                    <p className="text-gray-300">linkedin.com/in/eumoitinho</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Github className="h-5 w-5 mr-3 mt-1 text-indigo-400" />
                  <div>
                    <h4 className="font-medium">GitHub</h4>
                    <p className="text-gray-300">github.com/eumoitinho</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Behance className="h-5 w-5 mr-3 mt-1 text-indigo-400" />
                  <div>
                    <h4 className="font-medium">Behance</h4>
                    <p className="text-gray-300">behance.net/joaomoitinh1</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6">{t("letsConnect")}</h3>
              <p className="text-gray-300 mb-6">{t("connectDescription")}</p>

              <div className="flex gap-4">
                <Button asChild className="group bg-indigo-500 hover:bg-indigo-600">
                  <Link href="mailto:joao.moitinho@outlook.com">
                    {t("sendEmail")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-indigo-400 text-indigo-400 hover:bg-indigo-400/10">
                  <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    {t("downloadCV")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-6">{t("sendMessage")}</h3>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
