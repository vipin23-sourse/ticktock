
import React from "react";
import { timesheets, TimesheetEntry } from "@/lib/dummyData";
import { TimesheetTable } from "./TimesheetTable";

// Server-side data fetching function (directly accesses data on the server)
const fetchTimesheets = async (): Promise<TimesheetEntry[]> => {
  // In Server Components, query database or data layer directly
  return timesheets;
};

const TimesheetContainer = async () => {
  const data = await fetchTimesheets();

  return <TimesheetTable initialTimesheets={data} />;
};

export default TimesheetContainer;