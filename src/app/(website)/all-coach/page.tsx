"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CoachCard from "@/components/cards/CoachCard";
import { CoachResponse } from "@/types/coachDataType";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AllCoachesPage() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("default");
  const limit = 10;
  const excludeTitle = "Ea labore modi quas ";

  const {
    data,
    isLoading,
    isError,
  } = useQuery<CoachResponse>({
    queryKey: ["coaches", page],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        excludeTitle,
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coach/?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch coaches");
      return res.json();
    },
  });

  const coaches = data?.data?.coaches ?? [];
  const totalPages = data?.data?.pagination?.totalPages ?? 1;

  // Get unique service titles (excluding the specified title)
  const uniqueTitles = !isLoading && coaches.length > 0
    ? Array.from(new Set(coaches.map((coach) => coach.servicesOffered.title))).filter(
        (title) => title !== excludeTitle
      )
    : [];

  // Filter and sort coaches based on selected title
  const filteredCoaches = sortBy === "default"
    ? coaches
    : coaches.filter((coach) => coach.servicesOffered.title === sortBy).sort((a, b) =>
        a.servicesOffered.title.localeCompare(b.servicesOffered.title)
      );

  // Log unique service titles
  useEffect(() => {
    if (!isLoading && coaches.length > 0) {
      console.log("Unique Service Titles:", uniqueTitles);
    }
  }, [coaches, isLoading, uniqueTitles]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title and Sorting */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">All Coaches</h2>
            <p className="text-gray-600">
              {isLoading ? "Loading..." : `${filteredCoaches.length} coaches available`}
            </p>
          </div>
          <div className="w-48">
            <Select
              onValueChange={(value) => setSortBy(value)}
              value={sortBy}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by Service Title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">All</SelectItem>
                {uniqueTitles.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading & Error */}
        {isLoading && <p>Loading coaches...</p>}
        {isError && (
          <p className="text-red-500 text-center">Failed to load coaches.</p>
        )}

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {!isLoading &&
            filteredCoaches.map((coach) => (
              <CoachCard
                key={coach._id}
                coach={coach}
              />
            ))}
        </div>

        {/* Empty state */}
        {!isLoading && filteredCoaches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No coaches available at the moment.
            </p>
          </div>
        )}

        {/* ShadCN Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-10 justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm font-medium text-gray-700">
                  Page {page} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}