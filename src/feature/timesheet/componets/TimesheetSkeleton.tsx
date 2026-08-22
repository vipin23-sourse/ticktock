import React from "react";

export const TimesheetSkeleton = () => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        {/* Title Skeleton */}
        <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>

        {/* Filter Skeletons */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-10 w-36 bg-gray-200 rounded-md"></div>
          <div className="h-10 w-36 bg-gray-200 rounded-md"></div>
        </div>

        {/* Table Skeleton */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 h-11 border-b flex items-center px-4 justify-between">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="divide-y">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 flex items-center px-4 justify-between">
                <div className="h-4 w-8 bg-gray-200 rounded"></div>
                <div className="h-4 w-36 bg-gray-200 rounded"></div>
                <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex items-center justify-between mt-6">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default TimesheetSkeleton;
