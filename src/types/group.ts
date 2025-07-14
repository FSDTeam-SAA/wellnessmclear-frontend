export interface Group {
  _id: string
  name: string
  groupType: "public" | "private"
  description?: string
  memberCount?: number
  createdAt: string
  updatedAt: string
}
