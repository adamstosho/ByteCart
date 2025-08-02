"use client"

import { useState } from "react"
import { Calendar, Edit, Package, Pill, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Item } from "@/types"
import { getItemStatus, getDaysUntilExpiry, getStatusBadgeColor, formatExpiryDate } from "@/lib/utils"
import { useItems } from "@/hooks/use-items"
import { EditItemDialog } from "./edit-item-dialog"

interface ItemsGridProps {
  items: Item[]
  onItemUpdate: () => void
}

export function ItemsGrid({ items, onItemUpdate }: ItemsGridProps) {
  const [deleteItem, setDeleteItem] = useState<Item | null>(null)
  const [editItem, setEditItem] = useState<Item | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { deleteItem: removeItem } = useItems()

  const handleDelete = async (item: Item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      await removeItem(item._id)
      onItemUpdate()
    }
  }

  const handleEdit = (item: Item) => {
    setEditItem(item)
  }

  const handleEditSuccess = () => {
    setEditItem(null)
    onItemUpdate()
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-stagger">
        {items.map((item) => {
          const status = getItemStatus(item.expiryDate)
          const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate)

          return (
            <Card key={item._id} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-gray-100">
                      {item.type === "grocery" ? (
                        <Package className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Pill className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <Badge className={getStatusBadgeColor(status)}>
                      {status === "fresh" && "Fresh"}
                      {status === "expiring" && `${daysUntilExpiry}d left`}
                      {status === "expired" && "Expired"}
                    </Badge>
                  </div>

                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item)} className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="mb-3">
                  <img
                    src={item.imageUrl || "/placeholder.svg?height=128&width=200&text=No+Image"}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-lg bg-gray-100"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=128&width=200&text=No+Image"
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Qty: {item.quantity}</span>
                    <span className="capitalize">{item.type}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{formatExpiryDate(item.expiryDate)}</span>
                  </div>
                  {item.notes && (
                    <p className="text-sm text-gray-600 truncate" title={item.notes}>
                      {item.notes}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {editItem && (
        <EditItemDialog
          item={editItem}
          open={!!editItem}
          onOpenChange={() => setEditItem(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  )
}
