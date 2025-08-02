"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ItemFilters as IItemFilters } from "@/types"

interface ItemFiltersProps {
  filters: IItemFilters
  onFiltersChange: (filters: IItemFilters) => void
}

export function ItemFilters({ filters, onFiltersChange }: ItemFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value })
  }

  const handleTypeChange = (value: string) => {
    onFiltersChange({ ...filters, type: value as any })
  }

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value as any })
  }

  const clearFilters = () => {
    onFiltersChange({ search: "", type: "all", status: "all" })
  }

  const hasActiveFilters = filters.search || filters.type !== "all" || filters.status !== "all"

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search items..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filters.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="grocery">Grocery</SelectItem>
            <SelectItem value="medicine">Medicine</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="fresh">Fresh</SelectItem>
            <SelectItem value="expiring">Expiring</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto bg-transparent">
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {filters.search}
              <button onClick={() => handleSearchChange("")} className="ml-1 hover:bg-gray-200 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.type !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Type: {filters.type}
              <button onClick={() => handleTypeChange("all")} className="ml-1 hover:bg-gray-200 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.status !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {filters.status}
              <button onClick={() => handleStatusChange("all")} className="ml-1 hover:bg-gray-200 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
