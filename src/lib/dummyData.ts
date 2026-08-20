export type TimesheetEntry = {
  id: number;
  dateRange: string;
  status: string;
  action: string;
};

export const timesheets: TimesheetEntry[] = [
  { id: 1, dateRange: "1 - 5 January, 2024", status: "COMPLETED", action: "View" },
  { id: 2, dateRange: "8 - 12 January, 2024", status: "COMPLETED", action: "View" },
  { id: 3, dateRange: "15 - 19 January, 2024", status: "INCOMPLETE", action: "Update" },
  { id: 4, dateRange: "22 - 26 January, 2024", status: "COMPLETED", action: "View" },
  { id: 5, dateRange: "28 January - 1 February, 2024", status: "MISSING", action: "Create" },
];