import { Skeleton } from "@/components/ui/skeleton";

export function CoachDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Coach Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <Skeleton className="w-48 h-48 rounded-lg" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-3">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-5 w-5 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Qualification, Field, Skills Cards */}
            {["Qualification", "Field of Experiences", "Skills"].map((title) => (
              <div key={title} className="bg-white p-6 rounded-lg shadow">
                <Skeleton className="h-6 w-1/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>

          {/* Right Column - Availability + Booking */}
          <div className="space-y-6">
            {/* Opening Hours */}
            <div className="bg-white p-6 rounded-lg shadow">
              <Skeleton className="h-6 w-1/3 mb-4" />
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-1/4" />
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, j) => (
                      <Skeleton key={j} className="h-6 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Form */}
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
              {["Name", "Email", "Phone", "Day", "Time Slot"].map((label, index) => (
                <div key={index}>
                  <Skeleton className="h-4 w-1/4 mb-1" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              ))}
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
