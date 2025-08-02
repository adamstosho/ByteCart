"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"

interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  buttonText: string
}

export function PricingSection() {
  const plans: PricingPlan[] = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Up to 50 items",
        "Basic expiration tracking",
        "Email reminders",
        "Mobile responsive"
      ],
      buttonText: "Get Started Free"
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "For serious home chefs",
      features: [
        "Unlimited items",
        "Advanced analytics",
        "Family sharing",
        "Priority support",
        "Custom categories",
        "Export data"
      ],
      popular: true,
      buttonText: "Start Pro Trial"
    },
    {
      name: "Family",
      price: "$19.99",
      description: "For families and roommates",
      features: [
        "Everything in Pro",
        "Up to 5 family members",
        "Shared shopping lists",
        "Meal planning",
        "Recipe integration",
        "Advanced reporting"
      ],
      buttonText: "Start Family Plan"
    }
  ]

  return (
   <div></div>
  )
} 