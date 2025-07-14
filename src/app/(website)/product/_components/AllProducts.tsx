"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "@/components/cards/product-card";
import { ProductResponse } from "@/types/productDataType";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoriesResponse } from "@/types/category";

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);

  // Fetch categories
  const { data: categoryData } = useQuery<CategoriesResponse>({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  const categories = [
    { _id: "all", name: "All Products", subCategories: [] },
    ...(categoryData?.data || []),
  ];

  // Build product URL with filters (without priceSort param)
  const buildProductUrl = () => {
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/product`;
    const params = new URLSearchParams();

    params.append("page", page.toString());

    if (selectedCategory !== "all") {
      params.append("category", selectedCategory);
    }
    if (selectedSubCategory) {
      params.append("subCategory", selectedSubCategory);
    }

    return `${baseUrl}?${params.toString()}`;
  };

  // Fetch products with filters (no price sorting)
  const { data, isLoading, isError, refetch } = useQuery<ProductResponse>({
    queryKey: ["products", page, selectedCategory, selectedSubCategory],
    queryFn: async () => {
      const res = await fetch(buildProductUrl(), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const pagination = data?.data.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  };

  // Frontend sorting of products based on priceSort state using discountedPrice
  const products = (data?.data.products || []).slice(); // copy array to avoid mutating cache

  if (priceSort === "asc") {
    products.sort((a, b) => (a.discountedPrice ?? 0) - (b.discountedPrice ?? 0));
  } else if (priceSort === "desc") {
    products.sort((a, b) => (b.discountedPrice ?? 0) - (a.discountedPrice ?? 0));
  }

  const toggleCategory = (id: string) => {
    if (selectedCategory === id) {
      setExpandedCategoryId(null);
      setSelectedCategory("all");
      setSelectedSubCategory(null);
    } else {
      setExpandedCategoryId(id);
      setSelectedCategory(id);
      setSelectedSubCategory(null);
    }
    setPage(1);
  };

  const selectSubCategory = (name: string) => {
    setSelectedSubCategory(name);
    setExpandedCategoryId(null);
    setPage(1);
  };

  const togglePriceSort = () => {
    if (priceSort === "asc") setPriceSort("desc");
    else if (priceSort === "desc") setPriceSort(null);
    else setPriceSort("asc");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">{pagination.total} Results</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8 relative z-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div key={cat._id} className="relative">
                <Button
                  variant={selectedCategory === cat._id ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCategory(cat._id)}
                  className={selectedCategory === cat._id ? "bg-black text-white" : ""}
                >
                  {cat.name}
                  {cat.subCategories?.length > 0 &&
                    (expandedCategoryId === cat._id ? (
                      <ChevronUp className="w-4 h-4 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-2" />
                    ))}
                </Button>

                {/* Subcategory dropdown */}
                {expandedCategoryId === cat._id && cat.subCategories?.length > 0 && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    {cat.subCategories.map((subCat, index) => (
                      <li
                        key={index}
                        className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${
                          selectedSubCategory === subCat.name ? "bg-gray-100 font-medium" : ""
                        }`}
                        onClick={() => selectSubCategory(subCat.name)}
                      >
                        {subCat.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Price Filter */}
          <Button
            variant={priceSort ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2 bg-transparent"
            onClick={togglePriceSort}
            title="Toggle price sort: none → low to high → high to low"
          >
            Price{" "}
            {priceSort === "asc" && <span>↑</span>}
            {priceSort === "desc" && <span>↓</span>}
            {!priceSort && <ChevronDown className="w-4 h-4" />}
          </Button>

          {/* Sort By (other) */}
          {/* <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              Best Sellers
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div> */}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-52 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center text-red-500">
            <p>Something went wrong while fetching products.</p>
            <Button onClick={() => refetch()} variant="outline">
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-20 lg:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  showAddToCart={true}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={pagination.page === 1}
              >
                Previous
              </Button>

              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={pagination.page === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(i + 1)}
                  className={pagination.page === i + 1 ? "bg-[#A8C2A3] text-white" : ""}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
                disabled={pagination.page === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
