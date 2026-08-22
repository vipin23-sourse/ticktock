import React from "react";
import { dailyTasks, DailyTasks } from "@/lib/dummyData";
import WeekDetailsView from "./WeekDetailsView";

// Server-side data fetching helper function for week details
const fetchWeekDetails = async (
  weekId: string
): Promise<DailyTasks[]> => {
  // In a real application, fetch from DB using weekId: await db.week.findUnique({ where: { id: weekId } })
  return dailyTasks;
};

interface WeekDetailsContainerProps {
  weekId: string;
}

const WeekDetailsContainer = async ({ weekId }: WeekDetailsContainerProps) => {
  const tasksData = await fetchWeekDetails(weekId);

  return <WeekDetailsView initialDailyTasks={tasksData} weekId={weekId} />;
};

export default WeekDetailsContainer;
