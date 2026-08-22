import React from "react";

export const WeekDetailsSkeleton = () => {
  return (
    <div className="w-full mx-auto p-5 md:p-6 bg-white rounded-md animate-pulse">
      {/* Header Section Skeleton */}
      <div className="flex justify-between flex-wrap gap-4 items-start">
        <div>
          <div className="h-8 w-64 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>

        {/* Progress Skeleton */}
        <div className="md:w-48 w-full">
          <div className="flex justify-between mb-2">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-10 bg-gray-200 rounded"></div>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Daily Tasks Skeleton */}
      <div className="space-y-6 mt-6">
        {[1, 2].map((dayIndex) => (
          <div
            key={dayIndex}
            className="grid md:grid-cols-[108px_1fr] gap-4 md:gap-5 items-start"
          >
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
            <div className="space-y-2.5">
              {[1, 2].map((taskIndex) => (
                <div
                  key={taskIndex}
                  className="h-12 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-between px-3"
                >
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              ))}
              <div className="h-10 w-full bg-gray-100 rounded-lg border border-dashed border-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekDetailsSkeleton;
