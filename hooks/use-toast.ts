"use client"

import type React from "react"

// This file was missing from the project
import { useState } from "react"

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: "default" | "destructive"
}

type Toast = Omit<ToastProps, "id">

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = ({ ...props }: Toast) => {
    const id = Math.random().toString(36).substring(2, 9)

    setToasts((prevToasts) => [
      ...prevToasts,
      {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss(id)
        },
      },
    ])

    return {
      id,
      dismiss: () => dismiss(id),
      update: (props: Toast) => {
        setToasts((prevToasts) => prevToasts.map((t) => (t.id === id ? { ...t, ...props } : t)))
      },
    }
  }

  const dismiss = (toastId?: string) => {
    setToasts((prevToasts) =>
      prevToasts.map((t) => (toastId === undefined || t.id === toastId ? { ...t, open: false } : t)),
    )

    // Remove toast after animation completes
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toastId && toastId !== undefined))
    }, 300)
  }

  return {
    toasts,
    toast,
    dismiss,
  }
}
