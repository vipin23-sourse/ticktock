import React, { Suspense } from "react";
import TimesheetContainer from "@/feature/timesheet/componets/TimesheetContainer";
import { TimesheetSkeleton } from "@/feature/timesheet/componets/TimesheetSkeleton";

const Page = () => {
  return (
    <Suspense fallback={<TimesheetSkeleton />}>
      <TimesheetContainer />
    </Suspense>
  );
};

export default Page;