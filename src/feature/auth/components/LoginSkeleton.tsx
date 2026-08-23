import React from "react";

export const LoginSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse w-full">
      {/* Email Input Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-12 bg-gray-200 rounded"></div>
        <div className="h-10 w-full bg-gray-100 rounded-md border border-gray-200"></div>
      </div>

      {/* Password Input Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        <div className="h-10 w-full bg-gray-100 rounded-md border border-gray-200"></div>
      </div>

      {/* Remember Me Checkbox Skeleton */}
      <div className="flex items-center space-x-2 pt-1">
        <div className="size-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* Submit Button Skeleton */}
      <div className="h-10 w-full bg-primary/70 rounded-md mt-2"></div>
    </div>
  );
};

export default LoginSkeleton;
