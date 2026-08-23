import React from "react";
import { getWeekDetailsById, WeekDetails } from "@/lib/dummyData";
import WeekDetailsView from "./WeekDetailsView";

// Server-side data fetching helper function for week details
const fetchWeekDetails = async (
  weekId: string
): Promise<WeekDetails> => {
  return getWeekDetailsById(weekId);
};

interface WeekDetailsContainerProps {
  weekId: string;
}

const WeekDetailsContainer = async ({ weekId }: WeekDetailsContainerProps) => {
  const weekData = await fetchWeekDetails(weekId);

  return (
    <WeekDetailsView
      weekId={weekId}
      dateRange={weekData.dateRange}
      status={weekData.status}
      initialDailyTasks={weekData.dailyTasks}
    />
  );
};

export default WeekDetailsContainer;

