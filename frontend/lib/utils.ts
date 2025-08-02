import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Item, ItemStatus } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getItemStatus(expiryDate: string): ItemStatus {
  const expiry = new Date(expiryDate)
  const now = new Date()
  const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (daysUntilExpiry < 0) {
    return "expired"
  } else if (daysUntilExpiry <= 7) {
    return "expiring"
  } else {
    return "fresh"
  }
}

export function getDaysUntilExpiry(expiryDate: string): number {
  const expiry = new Date(expiryDate)
  const now = new Date()
  return Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export function getStatusColor(status: ItemStatus): string {
  switch (status) {
    case "fresh":
      return "text-green-600 bg-green-50 border-green-200"
    case "expiring":
      return "text-amber-600 bg-amber-50 border-amber-200"
    case "expired":
      return "text-red-600 bg-red-50 border-red-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

export function getStatusBadgeColor(status: ItemStatus): string {
  switch (status) {
    case "fresh":
      return "bg-green-100 text-green-800"
    case "expiring":
      return "bg-amber-100 text-amber-800"
    case "expired":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function formatExpiryDate(expiryDate: string): string {
  const expiry = new Date(expiryDate)
  return expiry.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function filterItems(items: Item[], filters: { search: string; type: string; status: string }): Item[] {
  return items.filter((item) => {
    // Search filter
    if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    // Type filter
    if (filters.type !== "all" && item.type !== filters.type) {
      return false
    }

    // Status filter
    if (filters.status !== "all") {
      const itemStatus = getItemStatus(item.expiryDate)
      if (itemStatus !== filters.status) {
        return false
      }
    }

    return true
  })
}

export function sortItems(items: Item[], sortBy: "name" | "expiry" | "type" | "created"): Item[] {
  return [...items].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "expiry":
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
      case "type":
        return a.type.localeCompare(b.type)
      case "created":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })
}
