"use client"

import { Package, AlertTriangle, XCircle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Item } from "@/types"
import { getItemStatus } from "@/lib/utils"

interface StatsCardsProps {
  items: Item[]
}

export function StatsCards({ items }: StatsCardsProps) {
  const totalItems = items.length
  const expiringItems = items.filter((item) => getItemStatus(item.expiryDate) === "expiring").length
  const expiredItems = items.filter((item) => getItemStatus(item.expiryDate) === "expired").length
  const freshItems = items.filter((item) => getItemStatus(item.expiryDate) === "fresh").length

  const stats = [
    {
      title: "Total Items",
      value: totalItems,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Fresh Items",
      value: freshItems,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Expiring Soon",
      value: expiringItems,
      icon: AlertTriangle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      change: "-3%",
      changeType: "negative" as const,
    },
    {
      title: "Expired",
      value: expiredItems,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: "-15%",
      changeType: "positive" as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center mt-1">
              <span
                className={`text-xs font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change}
              </span>
              <span className="text-xs text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
