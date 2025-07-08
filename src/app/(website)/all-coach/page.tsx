"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CoachCard from "@/components/cards/CoachCard";
import { CoachResponse } from "@/types/coachDataType";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function AllCoachesPage() {
  const [page, setPage] = useState(1);
  const limit = 8;

  const {
    data,
    isLoading,
    isError,
    // isFetching,
  } = useQuery<CoachResponse>({
    queryKey: ["coaches", page],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coach/?page=${page}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch coaches");
      return res.json();
    },
    // keepPreviousData: true,
  });

  const coaches = data?.data?.coaches ?? [];
  const totalPages = data?.data?.pagination?.totalPages ?? 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All Coaches</h2>
          <p className="text-gray-600">
            {isLoading ? "Loading..." : `${coaches.length} coaches available`}
          </p>
        </div>

        {/* Loading & Error */}
        {isLoading && <p>Loading coaches...</p>}
        {isError && (
          <p className="text-red-500 text-center">Failed to load coaches.</p>
        )}

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {!isLoading &&
            coaches.map((coach) => (
              <CoachCard
                key={coach._id}
                coach={coach}
              />
            ))}
        </div>

        {/* Empty state */}
        {!isLoading && coaches.length === 0 && (
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
