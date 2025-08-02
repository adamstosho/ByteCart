"use client"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Upload, X, Image as ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

import { useItems } from "@/hooks/use-items"
import { itemSchema, type ItemFormData } from "@/lib/validations"
import { cn } from "@/lib/utils"
import { apiService } from "@/lib/api"

interface AddItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatDateForInput(date: Date): string {
  return date.toISOString().split("T")[0]
}

export function AddItemDialog({ open, onOpenChange, onSuccess }: AddItemDialogProps) {
  const [date, setDate] = useState<Date>()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { createItem } = useItems()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
  })

  const watchedType = watch("type")

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }

      setSelectedImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = async () => {
    if (!selectedImage) return

    setUploadingImage(true)
    try {
      const result = await apiService.uploadImage(selectedImage)
      if (result.success) {
        setValue('imageUrl', result.imageUrl)
        setSelectedImage(null)
        setImagePreview(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploadingImage(false)
    }
  }

  const removeSelectedImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onSubmit = async (data: ItemFormData) => {
    if (!date) return

    const formattedDate = formatDateForInput(date)
    const result = await createItem({
      ...data,
      expiryDate: formattedDate,
    })

    if (result.success) {
      reset()
      setDate(undefined)
      setSelectedImage(null)
      setImagePreview(null)
      onSuccess()
    }
  }

  const handleClose = () => {
    reset()
    setDate(undefined)
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>Add a new perishable item to track its expiry date and get reminders.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Item Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Organic Milk"
                {...register("name")}
                className={cn(
                  "w-full",
                  errors.name ? "border-red-500 focus:border-red-500" : ""
                )}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium text-gray-700">Type *</Label>
              <Select onValueChange={(value) => setValue("type", value as "grocery" | "medicine")}>
                <SelectTrigger className={cn(
                  "w-full",
                  errors.type ? "border-red-500 focus:border-red-500" : ""
                )}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grocery">Grocery</SelectItem>
                  <SelectItem value="medicine">Medicine</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-red-600">{errors.type.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                defaultValue="1"
                {...register("quantity", { valueAsNumber: true })}
                className={cn(
                  "w-full",
                  errors.quantity ? "border-red-500 focus:border-red-500" : ""
                )}
              />
              {errors.quantity && <p className="text-sm text-red-600">{errors.quantity.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Expiry Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                      errors.expiryDate && "border-red-500 focus:border-red-500",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? formatDate(date) : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      setDate(date)
                      setValue("expiryDate", date ? formatDateForInput(date) : "")
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.expiryDate && <p className="text-sm text-red-600">{errors.expiryDate.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Item Image (Optional)</Label>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

            {/* Image preview */}
            {imagePreview && (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 w-6 h-6"
                  onClick={removeSelectedImage}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}

            {/* Upload controls */}
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
                disabled={uploadingImage}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                {selectedImage ? 'Change Image' : 'Select Image'}
              </Button>
              
              {selectedImage && (
                <Button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={uploadingImage}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {uploadingImage ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Current image URL (if uploaded) */}
            {watch("imageUrl") && !selectedImage && (
              <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Image uploaded successfully</p>
                <p className="text-xs text-gray-500 truncate">{watch("imageUrl")}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder={
                watchedType === "medicine"
                  ? "e.g., Take with food, 500mg tablets"
                  : "e.g., Store in refrigerator, organic"
              }
              {...register("notes")}
              rows={2}
              className="w-full"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700">
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Adding...
                </>
              ) : (
                "Add Item"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
