"use client";

import React, { useState } from "react";
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
// Utilizing the shadcn field components
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";

export function AddEntryModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [project, setProject] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(1);
  const [error, setError] = useState("");

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

    console.log("Form Submitted:", { project, typeOfWork, description, hours });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold">Add New Entry</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

            {/* Project Field */}
            <Field>
              <FieldLabel>Select Project *</FieldLabel>
              <Select onValueChange={setProject} value={project}>
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
            <Field>
              <FieldLabel>Type of Work *</FieldLabel>
              <Select onValueChange={setTypeOfWork} value={typeOfWork}>
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
            <Field>
              <FieldLabel>Task description *</FieldLabel>
              <Textarea 
                placeholder="Write text here ..." 
                className="resize-none min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FieldDescription>A note for extra info</FieldDescription>
            </Field>

            {/* Hours Field */}
            <Field>
              <FieldLabel>Hours *</FieldLabel>
              <div className="flex items-center gap-2 max-w-[120px]">
                <Button 
                  type="button" variant="outline" size="icon" className="h-9 w-9"
                  onClick={() => setHours(Math.max(1, hours - 1))}
                >
                  -
                </Button>
                <Input 
                  type="number" 
                  className="text-center h-9 text-base font-medium pointer-events-none" 
                  value={hours}
                  readOnly
                />
                <Button 
                  type="button" variant="outline" size="icon" className="h-9 w-9"
                  onClick={() => setHours(Math.min(24, hours + 1))}
                >
                  +
                </Button>
              </div>
            </Field>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Add entry
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}