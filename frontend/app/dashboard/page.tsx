"use client"

import { useState } from "react"
import { Plus, Filter, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ItemsGrid } from "@/components/items/items-grid"
import { ItemFilters } from "@/components/items/item-filters"
import { AddItemDialog } from "@/components/items/add-item-dialog"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { EmptyState } from "@/components/ui/empty-state"
import { useItems } from "@/hooks/use-items"
import { getItemStatus } from "@/lib/utils"

export default function DashboardPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const { items, allItems, loading, error, filters, setFilters, fetchItems } = useItems()

  const expiringCount = allItems.filter((item) => getItemStatus(item.expiryDate) === "expiring").length

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query }))
  }

  const handleAddItem = () => {
    setShowAddDialog(false)
    fetchItems() // Refresh items after adding
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchItems}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} notificationCount={expiringCount} />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your perishable items and track expiry dates</p>
            </div>
            <Button onClick={() => setShowAddDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          <StatsCards items={allItems} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Your Items</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4">
                <ItemFilters filters={filters} onFiltersChange={setFilters} />
              </div>
            )}
          </div>

          <div className="p-6">
            {items.length === 0 ? (
              <EmptyState
                icon={<Package className="w-12 h-12" />}
                title="No items found"
                description={
                  allItems.length === 0
                    ? "Get started by adding your first perishable item"
                    : "Try adjusting your filters to see more items"
                }
                action={
                  allItems.length === 0 ? (
                    <Button onClick={() => setShowAddDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Item
                    </Button>
                  ) : undefined
                }
              />
            ) : (
              <ItemsGrid items={items} onItemUpdate={fetchItems} />
            )}
          </div>
        </div>
      </main>

      <AddItemDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSuccess={handleAddItem} />
    </div>
  )
}
