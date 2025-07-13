"use client"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import Image from "next/image"

interface Product {
  _id: string
  name: string
  image: string
  slug?: string
}

interface Props {
  open: boolean
  onClose: () => void
  searchQuery: string
}

export default function SearchModal({ open, onClose, searchQuery }: Props) {
  const [query, setQuery] = useState(searchQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300) // 300ms delay

    return () => {
      clearTimeout(handler)
    }
  }, [query])

  const { data, isFetching } = useQuery({
    queryKey: ["search-products", debouncedQuery],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product?search=${debouncedQuery}`)
      if (!res.ok) throw new Error("Failed to fetch products")
      const result = await res.json()
      return result.data.products || []
    },
    enabled: !!debouncedQuery && open,
  })

  // Keep local input in sync when modal opens
  useEffect(() => {
    if (open) {
      setQuery(searchQuery)
    }
  }, [open, searchQuery])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>Search Products</DialogHeader>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-sm"
          autoFocus
        />

        {isFetching ? (
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Searching...
          </div>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {data?.length ? (
              data.map((product: Product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.slug || product._id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="text-sm">{product.name}</span>
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-500">No products found.</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
