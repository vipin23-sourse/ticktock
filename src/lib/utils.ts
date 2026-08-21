import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Required by shadcn/ui to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type TimesheetStatus = "COMPLETED" | "INCOMPLETE" | "MISSING";

/**
 * Calculates the weekly status based on total added hours.
 * 
 * Rules:
 * - completed = 40 hours added by the user
 * - incomplete = less than 40 hours added by the user
 * - missing = no hours added by the user
 */
export function calculateWeeklyStatus(totalHours: number): TimesheetStatus {
  if (totalHours === 0) {
    return "MISSING";
  }
  if (totalHours >= 40) {
    return "COMPLETED";
  }
  return "INCOMPLETE";
}