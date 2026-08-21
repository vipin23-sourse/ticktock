"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Task } from "@/lib/dummyData";

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTask?: Task | null;
}

export function AddEntryModal({ isOpen, onClose, initialTask }: AddEntryModalProps) {
  const [project, setProject] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialTask) {
      setProject(initialTask.project.toLowerCase().includes("b") ? "project-b" : "project-a");
      setTypeOfWork("bug-fixes");
      setDescription(initialTask.title || "");
      setHours(initialTask.hours || 1);
    } else {
      setProject("");
      setTypeOfWork("");
      setDescription("");
      setHours(1);
    }
    setError("");
  }, [initialTask, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!project || !typeOfWork) {
      setError("Project and Type of Work are required.");
      return;
    }
    if (description.length < 5) {
      setError("Description must be at least 5 characters.");
      return;
    }
    if (!hours || hours < 1) {
      setError("Hours must be at least 1.");
      return;
    }

    console.log(initialTask ? "Task Updated:" : "Form Submitted:", {
      id: initialTask?.id,
      project,
      typeOfWork,
      description,
      hours,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-161.5 p-0 gap-0">
        <DialogHeader   className="border-b border-gray-300 p-5">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {initialTask ? "Edit Entry" : "Add New Entry"}
          </DialogTitle>
          
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-5">
          <FieldGroup>
            {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

            {/* Project Field */}
            <Field className="max-w-91 w-full">
              <FieldLabel className="text-gray-900">Select Project *</FieldLabel>
              <Select onValueChange={(val) => setProject(val ?? "")} value={project}>
                <SelectTrigger>
                  <SelectValue placeholder="Project Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project-a">Project A</SelectItem>
                  <SelectItem value="project-b">Project B</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Type of Work Field */}
            <Field className="max-w-91 w-full">
              <FieldLabel className="text-gray-900">Type of Work *</FieldLabel>
              <Select onValueChange={(val) => setTypeOfWork(val ?? "")} value={typeOfWork}>
                <SelectTrigger>
                  <SelectValue placeholder="Bug fixes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug-fixes">Bug fixes</SelectItem>
                  <SelectItem value="feature">Feature Development</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Description Field */}
            <Field className="max-w-123.5 w-full">
              <FieldLabel className="text-gray-900">Task description *</FieldLabel>
              <Textarea 
                placeholder="Write text here ..." 
                className="resize-none min-h-25 max-h-28.75 sm:max-h-40.75"
                value={description}
                maxLength={1000}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FieldDescription>A note for extra info</FieldDescription>
            </Field>

            {/* Hours Field */}
            <Field>
              <FieldLabel className="text-gray-900">Hours *</FieldLabel>
              <div className="flex items-center max-w-max">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9 shrink-0 cursor-pointer rounded-none rounded-l-lg border-r-0 bg-gray-100"
                  onClick={() => setHours((prev) => Math.max(1, prev - 1))}
                >
                  -
                </Button>
                <Input 
                  type="number" 
                  min={1}
                  max={24}
                  className="text-center h-9 py-2 px-3 tracking-tight text-gray-500  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-none" 
                  value={hours || ""}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (isNaN(val)) {
                      setHours(0);
                    } else {
                      setHours(Math.max(1, Math.min(24, val)));
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9 shrink-0 cursor-pointer rounded-none rounded-r-lg border-l-0 bg-gray-100"
                  onClick={() => setHours((prev) => Math.min(24, prev + 1))}
                >
                  +
                </Button>
              </div>
            </Field>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer  ">
                {initialTask ? "Save changes" : "Add entry"}
              </Button>
              <Button type="button" variant="outline" className="flex-1 cursor-pointer " onClick={onClose}>
                Cancel
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}