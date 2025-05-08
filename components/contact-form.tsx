"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useTranslation } from "@/hooks/use-translation"

export function ContactForm() {
  const { t, language } = useTranslation()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formSchema = z.object({
    name: z.string().min(2, { message: t("nameRequired") }),
    email: z.string().email({ message: t("emailRequired") }),
    subject: z.string().min(5, { message: t("subjectRequired") }),
    message: z.string().min(10, { message: t("messageRequired") }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // In a real app, you would send the data to your API here
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: t("messageSent"),
        description: t("thankYou"),
      })

      form.reset()
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorMessage"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t("name")}</FormLabel>
                <FormControl>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Input
                      placeholder={language === "pt" ? "Seu nome" : "Your name"}
                      {...field}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </motion.div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t("email")}</FormLabel>
                <FormControl>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Input
                      placeholder={language === "pt" ? "Seu email" : "Your email"}
                      {...field}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </motion.div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t("subject")}</FormLabel>
              <FormControl>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Input
                    placeholder={language === "pt" ? "Assunto da mensagem" : "Message subject"}
                    {...field}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </motion.div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t("message")}</FormLabel>
              <FormControl>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Textarea
                    placeholder={language === "pt" ? "Sua mensagem" : "Your message"}
                    rows={5}
                    {...field}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </motion.div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button type="submit" disabled={isSubmitting} className="w-full bg-indigo-500 hover:bg-indigo-600">
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t("sending")}
              </span>
            ) : (
              t("send")
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}
