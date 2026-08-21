"use client";

import React, { use, useState } from "react";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { dailyTasks, Task } from "@/lib/dummyData";
import { AddEntryModal } from "@/components/ui/modals/AddEntryModal";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WeeklyTimesheetPage({
  params,
}: {
  params: Promise<{ weekId: string }>;
}) {
  const resolvedParams = use(params);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-md">
      
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">This week's timesheet</h2>
          <p className="text-sm text-gray-500">21 - 26 January, 2024</p>
        </div>
        
        {/* Progress Bar Area */}
        <div className="w-48 text-right">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-gray-900">20/40 hrs</span>
            <span className="text-gray-500">50%</span>
          </div>
          <Progress value={50}  />
        </div>
      </div>

      {/* Daily Tasks List */}
      <div className="space-y-8 mt-8">
        {dailyTasks.map((day) => (
          <div key={day.date} className="grid grid-cols-[100px_1fr] gap-4 items-start">
            <h3 className="text-lg font-semibold text-gray-900 pt-3">{day.date}</h3>
            
            <div className="space-y-3">
              {day.tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900"
                >
                  <span className="font-medium text-gray-900">{task.title}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{task.hours} hrs</span>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {task.project}
                    </span>
                    
                    {/* 3-Dot Actions Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600" />
                        }
                      >
                        <span className="sr-only">Open menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditTask(task)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {/* Add Task Button for each day */}
              <button 
                onClick={handleAddTask}
                className="w-full py-3 border-2 border-dashed border-blue-200 text-blue-600 bg-blue-50/50 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors"
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