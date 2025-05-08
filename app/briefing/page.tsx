"use client"

import type React from "react"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ChevronDown, Send, Check, AlertCircle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import { BriefingTranslations } from "@/translations/briefing"

// Validation types
type ValidationErrors = {
  name?: string
  email?: string
  phone?: string
  [key: string]: string | undefined
}

// Section type
type Section = {
  id: string
  title: string
  required: boolean
  content: React.ReactNode
}

export default function BriefingPage() {
  const { t, language } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()
  const briefingT = BriefingTranslations[language]

  // Refs for section elements
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const [activeSections, setActiveSections] = useState<string[]>(["contact", "project"])
  const [currentSection, setCurrentSection] = useState<string>("contact")
  const [progress, setProgress] = useState<number>(0)
  const [formData, setFormData] = useState({
    // Contact
    name: "",
    email: "",
    phone: "",
    company: "",

    // Project Basics
    projectName: "",
    projectType: "",
    industry: "",

    // Visual Identity
    existingBranding: "",
    colorPreferences: "",
    stylePreferences: "",
    references: "",

    // Website
    websiteGoals: "",
    targetAudience: "",
    keyFeatures: "",
    competitors: "",

    // Timeline & Budget
    timeline: "",
    budget: "",

    // Additional Info
    additionalInfo: "",
  })

  // Validation state
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Use useCallback to prevent recreation of this function on each render
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  // Handle field blur - mark field as touched
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }, [])

  // Define sections
  const sections: Section[] = [
    {
      id: "contact",
      title: briefingT.contactInfo,
      required: true,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={errors.name && touched.name ? "text-red-500" : ""}>
                {briefingT.name} *
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={briefingT.namePlaceholder}
                  required
                  className={errors.name && touched.name ? "border-red-500 pr-10" : ""}
                />
                {errors.name && touched.name && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.name && touched.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">{briefingT.company}</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={briefingT.companyPlaceholder}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className={errors.email && touched.email ? "text-red-500" : ""}>
                {briefingT.email} *
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={briefingT.emailPlaceholder}
                  required
                  className={errors.email && touched.email ? "border-red-500 pr-10" : ""}
                />
                {errors.email && touched.email && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className={errors.phone && touched.phone ? "text-red-500" : ""}>
                {briefingT.phone} *
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={briefingT.phonePlaceholder}
                  required
                  className={errors.phone && touched.phone ? "border-red-500 pr-10" : ""}
                />
                {errors.phone && touched.phone && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.phone && touched.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "project",
      title: briefingT.projectBasics,
      required: true,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">{briefingT.projectName}</Label>
            <Input
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={briefingT.projectNamePlaceholder}
            />
          </div>
          <div className="space-y-2">
            <Label>{briefingT.projectType}</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="website"
                  name="projectType"
                  value="website"
                  checked={formData.projectType === "website"}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="h-4 w-4 text-indigo-500 focus:ring-indigo-500"
                />
                <Label htmlFor="website" className="cursor-pointer">
                  {briefingT.website}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="visualIdentity"
                  name="projectType"
                  value="visualIdentity"
                  checked={formData.projectType === "visualIdentity"}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="h-4 w-4 text-indigo-500 focus:ring-indigo-500"
                />
                <Label htmlFor="visualIdentity" className="cursor-pointer">
                  {briefingT.visualIdentity}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="both"
                  name="projectType"
                  value="both"
                  checked={formData.projectType === "both"}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="h-4 w-4 text-indigo-500 focus:ring-indigo-500"
                />
                <Label htmlFor="both" className="cursor-pointer">
                  {briefingT.both}
                </Label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">{briefingT.industry}</Label>
            <Input
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={briefingT.industryPlaceholder}
            />
          </div>
        </div>
      ),
    },
    {
      id: "visual",
      title: briefingT.visualIdentity,
      required: false,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="existingBranding">{briefingT.existingBranding}</Label>
            <Textarea
              id="existingBranding"
              name="existingBranding"
              value={formData.existingBranding}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={briefingT.existingBrandingPlaceholder}
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="colorPreferences">{briefingT.colorPreferences}</Label>
            <Textarea
              id="colorPreferences"
              name="colorPreferences"
              value={formData.colorPreferences}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={briefingT.colorPreferencesPlaceholder}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stylePreferences">{briefingT.stylePreferences}</Label>
            <Textarea
              id="stylePreferences"
              name="stylePreferences"
              value={formData.stylePreferences}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={briefingT.stylePreferencesPlaceholder}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="references">{briefingT.references}</Label>
            <Textarea
              id="references"
              name="references"
              value={formData.references}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={briefingT.referencesPlaceholder}
            />
          </div>
        </div>
      ),
    },
    {
      id: "website",
      title: briefingT.websiteDetails,
      required: false,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="websiteGoals">{briefingT.websiteGoals}</Label>
            <Textarea
              id="websiteGoals"
              name="websiteGoals"
              value={formData.websiteGoals}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={briefingT.websiteGoalsPlaceholder}
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetAudience">{briefingT.targetAudience}</Label>
            <Textarea
              id="targetAudience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={briefingT.targetAudiencePlaceholder}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keyFeatures">{briefingT.keyFeatures}</Label>
            <Textarea
              id="keyFeatures"
              name="keyFeatures"
              value={formData.keyFeatures}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={briefingT.keyFeaturesPlaceholder}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="competitors">{briefingT.competitors}</Label>
            <Textarea
              id="competitors"
              name="competitors"
              value={formData.competitors}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={briefingT.competitorsPlaceholder}
            />
          </div>
        </div>
      ),
    },
    {
      id: "timeline",
      title: briefingT.timelineBudget,
      required: false,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timeline">{briefingT.timeline}</Label>
            <Input
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={briefingT.timelinePlaceholder}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">{briefingT.budget}</Label>
            <Input
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={briefingT.budgetPlaceholder}
            />
          </div>
        </div>
      ),
    },
    {
      id: "additional",
      title: briefingT.additionalInfo,
      required: false,
      content: (
        <div className="space-y-2">
          <Label htmlFor="additionalInfo">{briefingT.additionalDetails}</Label>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={briefingT.additionalDetailsPlaceholder}
            className="min-h-[150px]"
          />
        </div>
      ),
    },
  ]

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    if (!email) return briefingT.validationRequired
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return briefingT.validationEmail
    return undefined
  }

  const validatePhone = (phone: string): string | undefined => {
    if (!phone) return briefingT.validationRequired
    // This regex allows for various phone formats with optional country codes
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    if (!phoneRegex.test(phone)) return briefingT.validationPhone
    return undefined
  }

  const validateRequired = (value: string): string | undefined => {
    return !value ? briefingT.validationRequired : undefined
  }

  // Calculate progress
  useEffect(() => {
    // Count total fields in active sections
    let totalFields = 0
    let filledFields = 0

    // Required fields in contact section
    totalFields += 3 // name, email, phone
    if (formData.name && !errors.name) filledFields++
    if (formData.email && !errors.email) filledFields++
    if (formData.phone && !errors.phone) filledFields++

    // Optional field in contact section
    if (activeSections.includes("contact")) {
      totalFields += 1 // company
      if (formData.company) filledFields++
    }

    // Project basics section
    if (activeSections.includes("project")) {
      totalFields += 3 // projectName, projectType, industry
      if (formData.projectName) filledFields++
      if (formData.projectType) filledFields++
      if (formData.industry) filledFields++
    }

    // Visual identity section
    if (activeSections.includes("visual")) {
      totalFields += 4 // existingBranding, colorPreferences, stylePreferences, references
      if (formData.existingBranding) filledFields++
      if (formData.colorPreferences) filledFields++
      if (formData.stylePreferences) filledFields++
      if (formData.references) filledFields++
    }

    // Website details section
    if (activeSections.includes("website")) {
      totalFields += 4 // websiteGoals, targetAudience, keyFeatures, competitors
      if (formData.websiteGoals) filledFields++
      if (formData.targetAudience) filledFields++
      if (formData.keyFeatures) filledFields++
      if (formData.competitors) filledFields++
    }

    // Timeline & budget section
    if (activeSections.includes("timeline")) {
      totalFields += 2 // timeline, budget
      if (formData.timeline) filledFields++
      if (formData.budget) filledFields++
    }

    // Additional info section
    if (activeSections.includes("additional")) {
      totalFields += 1 // additionalInfo
      if (formData.additionalInfo) filledFields++
    }

    // Calculate progress percentage
    const calculatedProgress = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0
    setProgress(calculatedProgress)
  }, [formData, activeSections, errors])

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    // Required fields validation
    newErrors.name = validateRequired(formData.name)
    newErrors.email = validateEmail(formData.email)
    newErrors.phone = validatePhone(formData.phone)

    // Update errors state
    setErrors(newErrors)

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {}
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    // Form is valid if there are no errors
    return !Object.values(newErrors).some((error) => error !== undefined)
  }

  // Validate field on change
  useEffect(() => {
    const newErrors: ValidationErrors = { ...errors }

    // Only validate touched fields
    if (touched.name) newErrors.name = validateRequired(formData.name)
    if (touched.email) newErrors.email = validateEmail(formData.email)
    if (touched.phone) newErrors.phone = validatePhone(formData.phone)

    setErrors(newErrors)
  }, [formData, touched])

  const toggleSection = useCallback((section: string) => {
    setActiveSections((prev) => {
      if (prev.includes(section)) {
        return prev.filter((s) => s !== section)
      } else {
        return [...prev, section]
      }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields before submission
    const isValid = validateForm()

    if (!isValid) {
      toast({
        title: briefingT.errorTitle,
        description: briefingT.validationErrors,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Enviar dados para a API
      const response = await fetch("/api/submit-briefing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erro ao enviar o briefing")
      }

      toast({
        title: briefingT.successTitle,
        description: briefingT.successMessage,
      })

      setSubmitted(true)
    } catch (error) {
      console.error("Erro ao enviar o briefing:", error)
      toast({
        title: briefingT.errorTitle,
        description: typeof error === "string" ? error : briefingT.errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    if (activeSections.includes(sectionId) || sections.find((s) => s.id === sectionId)?.required) {
      setCurrentSection(sectionId)
      const sectionElement = sectionRefs.current[sectionId]
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      // If section is not active, activate it first
      toggleSection(sectionId)
      setTimeout(() => {
        setCurrentSection(sectionId)
        const sectionElement = sectionRefs.current[sectionId]
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }

  // Observe which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id.replace("section-", "")
            setCurrentSection(sectionId)
          }
        })
      },
      { threshold: 0.5 },
    )

    Object.keys(sectionRefs.current).forEach((sectionId) => {
      const element = sectionRefs.current[sectionId]
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      Object.keys(sectionRefs.current).forEach((sectionId) => {
        const element = sectionRefs.current[sectionId]
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [activeSections])

  if (submitted) {
    return (
      <div className="container mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-indigo-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-indigo-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{briefingT.thankYou}</h1>
          <p className="text-lg text-gray-300 mb-8">{briefingT.submissionReceived}</p>
          <Button onClick={() => router.push("/")} className="bg-indigo-500 hover:bg-indigo-600 text-white">
            {briefingT.backToHome}
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">{briefingT.pageTitle}</h1>
        <p className="text-gray-300 text-center mb-4">{briefingT.pageDescription}</p>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">{briefingT.progressTitle}</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-700" indicatorClassName="bg-indigo-500" />
        </div>

        {/* Steps indicator */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-1 min-w-max">
            {sections.map((section) => {
              const isActive = activeSections.includes(section.id) || section.required
              const isCurrent = currentSection === section.id
              const isCompleted = isActive && getSectionProgress(section.id, formData) === 100

              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap
                    ${isActive ? "opacity-100" : "opacity-50"}
                    ${isCurrent ? "bg-indigo-500 text-white" : isActive ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-700"}
                  `}
                  disabled={!isActive && !section.required}
                >
                  {isCompleted && <CheckCircle className="w-4 h-4 mr-1.5 text-green-400" />}
                  {section.title}
                  {section.required && (
                    <span className="ml-1 text-xs text-white bg-indigo-500 px-1.5 py-0.5 rounded-full text-[10px]">
                      *
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} id={`section-${section.id}`} ref={(el) => (sectionRefs.current[section.id] = el)}>
              <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                <div
                  className={`p-4 flex justify-between items-center cursor-pointer ${
                    section.required ? "bg-indigo-500/10" : "bg-gray-800"
                  } ${currentSection === section.id ? "ring-2 ring-indigo-500" : ""}`}
                  onClick={() => !section.required && toggleSection(section.id)}
                >
                  <h3 className="text-xl font-semibold flex items-center">
                    {section.title}
                    {section.required && (
                      <Badge variant="dark" className="ml-2 bg-indigo-500 text-white">
                        {briefingT.required}
                      </Badge>
                    )}
                  </h3>
                  {!section.required && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`toggle-${section.id}`}
                        checked={activeSections.includes(section.id)}
                        onChange={() => toggleSection(section.id)}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                      />
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          activeSections.includes(section.id) ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  )}
                </div>
                {(section.required || activeSections.includes(section.id)) && (
                  <CardContent className="pt-4">{section.content}</CardContent>
                )}
              </Card>
            </div>
          ))}

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex justify-center mt-8">
            <Button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-6 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {briefingT.submitting}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  {briefingT.submitBriefing}
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

// Helper function to calculate section progress
function getSectionProgress(sectionId: string, formData: any): number {
  switch (sectionId) {
    case "contact":
      const contactFields = [formData.name, formData.email, formData.phone, formData.company]
      const requiredContactFields = [formData.name, formData.email, formData.phone]
      const filledRequiredContact = requiredContactFields.filter(Boolean).length
      const filledContact = contactFields.filter(Boolean).length
      return filledRequiredContact === 3 ? 100 : Math.round((filledContact / 4) * 100)

    case "project":
      const projectFields = [formData.projectName, formData.projectType, formData.industry]
      const filledProject = projectFields.filter(Boolean).length
      return Math.round((filledProject / 3) * 100)

    case "visual":
      const visualFields = [
        formData.existingBranding,
        formData.colorPreferences,
        formData.stylePreferences,
        formData.references,
      ]
      const filledVisual = visualFields.filter(Boolean).length
      return Math.round((filledVisual / 4) * 100)

    case "website":
      const websiteFields = [formData.websiteGoals, formData.targetAudience, formData.keyFeatures, formData.competitors]
      const filledWebsite = websiteFields.filter(Boolean).length
      return Math.round((filledWebsite / 4) * 100)

    case "timeline":
      const timelineFields = [formData.timeline, formData.budget]
      const filledTimeline = timelineFields.filter(Boolean).length
      return Math.round((filledTimeline / 2) * 100)

    case "additional":
      return formData.additionalInfo ? 100 : 0

    default:
      return 0
  }
}
