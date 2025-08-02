"use client"

import { useState, useEffect, useCallback } from "react"
import type { Item, CreateItemData, UpdateItemData, ItemFilters } from "@/types"
import { apiService } from "@/lib/api"
import { toast } from "sonner"
import { filterItems, sortItems } from "@/lib/utils"

export function useItems() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ItemFilters>({
    search: "",
    type: "all",
    status: "all",
  })
  const [sortBy, setSortBy] = useState<"name" | "expiry" | "type" | "created">("expiry")

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getItems()
      setItems(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch items"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const createItem = async (data: CreateItemData) => {
    try {
      const newItem = await apiService.createItem(data)
      setItems((prev) => [newItem, ...prev])
      toast.success("Item added successfully!")
      return { success: true, item: newItem }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create item"
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const updateItem = async (id: string, data: UpdateItemData) => {
    try {
      const updatedItem = await apiService.updateItem(id, data)
      setItems((prev) => prev.map((item) => (item._id === id ? updatedItem : item)))
      toast.success("Item updated successfully!")
      return { success: true, item: updatedItem }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update item"
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const deleteItem = async (id: string) => {
    try {
      await apiService.deleteItem(id)
      setItems((prev) => prev.filter((item) => item._id !== id))
      toast.success("Item deleted successfully!")
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete item"
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const getExpiringItems = async () => {
    try {
      const data = await apiService.getExpiringItems()
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch expiring items"
      toast.error(message)
      return []
    }
  }

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  // Filter and sort items
  const filteredItems = filterItems(items, filters)
  const sortedItems = sortItems(filteredItems, sortBy)

  return {
    items: sortedItems,
    allItems: items,
    loading,
    error,
    filters,
    sortBy,
    setFilters,
    setSortBy,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    getExpiringItems,
  }
}
