"use client";

import React, { use, useState } from "react";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { dailyTasks, Task } from "@/lib/dummyData";
import { AddEntryModal } from "@/components/ui/modals/AddEntryModal";
import { useIsMobile } from "@/hooks/useIsMobile";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

function TaskActionsMenu({
  task,
  onEdit,
}: {
  task: Task;
  onEdit: (task: Task) => void;
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-0 text-sm">
        <DropdownMenuItem
          onClick={() => onEdit(task)}
          className="px-4 py-2 text-gray-700 cursor-pointer"
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600 px-4 py-2 cursor-pointer">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function WeeklyTimesheetPage({
  params,
}: {
  params: Promise<{ weekId: string }>;
}) {
  const resolvedParams = use(params);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const isMobile = useIsMobile(768);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full mx-auto p-5 md:p-6 bg-white rounded-md ">
      
      {/* Header Section */}
      <div className="flex justify-between flex-wrap gap-4 items-start">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 md:mb-6">This week's timesheet</h2>
          <p className="text-sm text-gray-500">21 - 26 January, 2024</p>
        </div>
        
        {/* Progress Bar Area */}
        <div className="md:w-48 w-full text-right">
          <div className="flex justify-between  text-sm font-medium mb-2">
            <span className="text-gray-900">20/40 hrs</span>
            <span className="text-gray-500">50%</span>
          </div>
          <Progress value={50}  />
        </div>
      </div>

      {/* Daily Tasks List */}
      <div className="space-y-6 mt-6">
        {dailyTasks.map((day) => (
          <div key={day.date} className="grid md:grid-cols-[108px_1fr] gap-4 md:gap-5 items-start">
            <h3 className="text-lg font-semibold text-gray-900 ">{day.date}</h3>
            
            <div className="space-y-2.5">
              {day.tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="grid md:grid-cols-[1fr_auto] items-center gap-5 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{task.title}</span>

                    {/* 3-Dot Actions Menu Mobile (Width check) */}
                    {isMobile && (
                      <TaskActionsMenu task={task} onEdit={handleEditTask} />
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2.5">{task.hours} hrs</span>
                    <Badge className="bg-primary-100 text-primary-800 mr-2"> 
                      {task.project} 
                    </Badge>                  
                    {/* 3-Dot Actions Menu Desktop (Width check) */}
                    {!isMobile && (
                      <TaskActionsMenu task={task} onEdit={handleEditTask} />
                    )}
                  </div>
                </div>
              ))}
              
              {/* Add Task Button for each day */}
              <button 
                onClick={handleAddTask}
                className="w-full py-3 border cursor-pointer border-gray-300 text-gray-500 border-dashed hover:border-blue-700 hover:text-blue-700 hover:bg-primary-100 rounded-lg font-medium  transition-colors"
              >
                + Add new task
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Entry Modal for Add & Edit */}
      <AddEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTask={editingTask}
      />
    </div>
  );
}