import React, { Suspense, use } from "react";
import WeekDetailsContainer from "@/feature/timesheet/componets/WeekDetailsContainer";
import WeekDetailsSkeleton from "@/feature/timesheet/componets/WeekDetailsSkeleton";

export default function WeeklyTimesheetPage({
  params,
}: {
  params: Promise<{ weekId: string }>;
}) {
  const resolvedParams = use(params);

  return (
    <Suspense fallback={<WeekDetailsSkeleton />}>
      <WeekDetailsContainer weekId={resolvedParams.weekId} />
    </Suspense>
  );
}