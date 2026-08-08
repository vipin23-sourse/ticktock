export interface TimesheetEntry {
    id: string;
    weekNumber: number;
    date: string; 
    status: "Completed" | "Incomplete" | "Missing";
  }
  
  export let timesheets: TimesheetEntry[] = [
    {
      id: "1",
      weekNumber: 32,
      date: "2026-08-05",
      status: "Completed",
    },
    {
      id: "2",
      weekNumber: 32,
      date: "2026-08-06",
      status: "Completed",
    },
  ];