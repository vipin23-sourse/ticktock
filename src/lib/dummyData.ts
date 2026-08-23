import jsonData from "./dummyData.json";

export type TimesheetEntry = {
  id: number;
  dateRange: string;
  status: string;
  action: string;
};

export type Task = {
  id: number;
  title: string;
  hours: number;
  project: string;
};

export type DailyTasks = {
  date: string;
  tasks: Task[];
};

export type WeekDetails = {
  id: number;
  dateRange: string;
  status: string;
  totalHours: number;
  targetHours: number;
  dailyTasks: DailyTasks[];
};

// All timesheet entries for table view
export const timesheets: TimesheetEntry[] = jsonData.timesheets;

// Helper function to get week details by ID
export function getWeekDetailsById(weekId: string | number): WeekDetails {
  const id = Number(weekId);
  const map = jsonData.weeklyTasksMap as Record<string, WeekDetails>;

  if (map[id]) {
    return map[id];
  }

  const timesheet = timesheets.find((t) => t.id === id);
  return {
    id,
    dateRange: timesheet?.dateRange ?? `Week #${id}`,
    status: timesheet?.status ?? "INCOMPLETE",
    totalHours: 0,
    targetHours: 40,
    dailyTasks: [],
  };
}