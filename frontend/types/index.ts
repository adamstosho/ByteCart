export interface User {
  _id: string
  name: string
  email: string
  token?: string
}

export interface Item {
  _id: string
  userId: string
  name: string
  type: "grocery" | "medicine"
  quantity: number
  expiryDate: string
  notes?: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface CreateItemData {
  name: string
  type: "grocery" | "medicine"
  quantity: number
  expiryDate: string
  notes?: string
  imageUrl?: string
}

export interface UpdateItemData extends CreateItemData {}

export interface AuthResponse {
  _id: string
  name: string
  email: string
  token: string
}

export interface ApiError {
  message: string
}

export type ItemStatus = "fresh" | "expiring" | "expired"
export type FilterType = "all" | "grocery" | "medicine"
export type FilterStatus = "all" | "fresh" | "expiring" | "expired"

export interface ItemFilters {
  search: string
  type: FilterType
  status: FilterStatus
}
