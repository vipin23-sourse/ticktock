"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DailyTasks, Task } from "@/lib/dummyData";
import { AddEntryModal } from "./AddEntryModal";
import { useIsMobile } from "@/hooks/useIsMobile";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, CalendarX, Plus } from "lucide-react";

function TaskActionsMenu({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="size-8 p-0 text-gray-500 hover:text-gray-600 cursor-pointer"
          />
        }
      >
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-0 text-sm">
        <DropdownMenuItem
          onClick={() => onEdit(task)}
          className="px-4 py-2 text-gray-700 cursor-pointer"
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onDelete(task.id)}
          className="text-red-600 px-4 py-2 cursor-pointer"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const StatusBadge = ({ status }: { status?: string }) => {
  if (!status) return null;
  switch (status.toUpperCase()) {
    case "COMPLETED":
      return <Badge className="bg-green-100 text-green-800 border-none">COMPLETED</Badge>;
    case "INCOMPLETE":
      return <Badge className="bg-yellow-100 text-yellow-800 border-none">INCOMPLETE</Badge>;
    case "MISSING":
      return <Badge className="bg-pink-100 text-pink-800 border-none">MISSING</Badge>;
    default:
      return null;
  }
};

interface WeekDetailsViewProps {
  initialDailyTasks?: DailyTasks[];
  weekId?: string;
  dateRange?: string;
  status?: string;
}

export const WeekDetailsView = ({
  initialDailyTasks = [],
  weekId = "",
  dateRange = "January, 2024",
  status = "INCOMPLETE",
}: WeekDetailsViewProps) => {
  const [dailyTasks, setDailyTasks] = useState<DailyTasks[]>(initialDailyTasks ?? []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const isMobile = useIsMobile(768);

  const totalHours = (dailyTasks ?? []).reduce(
    (acc, day) => acc + (day?.tasks ?? []).reduce((sum, task) => sum + (task?.hours ?? 0), 0),
    0
  );
  const targetHours = 40;
  const progressPercentage = Math.min(100, Math.round((totalHours / targetHours) * 100));

  const hasTasks = (dailyTasks ?? []).some((day) => (day?.tasks ?? []).length > 0);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: number) => {
    setDailyTasks((prev) =>
      prev
        .map((day) => ({
          ...day,
          tasks: day.tasks.filter((t) => t.id !== taskId),
        }))
        .filter((day) => day.tasks.length > 0)
    );
  };

  return (
    <div className="w-full mx-auto p-5 md:p-6 bg-white rounded-md shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between flex-wrap gap-4 items-start border-b pb-6 border-gray-100">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              This week's timesheet
            </div>
          </div>
          <p className="text-sm text-gray-500">{dateRange}</p>
        </div>

        {/* Dynamic Progress Bar Area */}
        <div className="md:w-48 w-full text-right">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-gray-900">{totalHours}/{targetHours} hrs</span>
            <span className="text-gray-500">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} />
        </div>
      </div>

      {/* Daily Tasks List or Empty State */}
      {!hasTasks ? (
      <div>
          <button
            onClick={handleAddTask}
            className="w-full py-3 border cursor-pointer border-gray-300 text-gray-500 border-dashed hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg font-medium transition-colors"
          >
            + Add new task
          </button>
        </div>
      ) : (
        <div className="space-y-6 mt-6">
          {(dailyTasks ?? []).map((day, idx) => (
            <div
              key={day?.date ?? idx}
              className="grid md:grid-cols-[108px_1fr] gap-4 md:gap-5 items-start"
            >
              <div className="text-lg font-semibold text-gray-900">{day?.date ?? ""}</div>

              <div className="space-y-2.5">
                {(day?.tasks ?? []).map((task) => (
                  <div
                    key={task?.id}
                    className="grid md:grid-cols-[1fr_auto] items-center gap-5 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {task?.title ?? ""}
                      </span>

                      {/* 3-Dot Actions Menu Mobile */}
                      {isMobile && task && (
                        <TaskActionsMenu
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                        />
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2.5">
                        {task?.hours ?? 0} hrs
                      </span>
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200 mr-2">
                        {task?.project ?? ""}
                      </Badge>
                      {/* 3-Dot Actions Menu Desktop */}
                      {!isMobile && task && (
                        <TaskActionsMenu
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                        />
                      )}
                    </div>
                  </div>
                ))}

                {/* Add Task Button for each day */}
                <button
                  onClick={handleAddTask}
                  className="w-full py-3 border cursor-pointer border-gray-300 text-gray-500 border-dashed hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                >
                  + Add new task
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Entry Modal for Add & Edit */}
      <AddEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTask={editingTask}
      />
    </div>
  );
};

export default WeekDetailsView;

