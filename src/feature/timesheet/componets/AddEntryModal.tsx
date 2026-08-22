"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { entrySchema, type EntryFormData } from "./schema";

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTask?: Task | null;
}

export function AddEntryModal({ isOpen, onClose, initialTask }: AddEntryModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EntryFormData>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      project: "",
      typeOfWork: "",
      description: "",
      hours: 1,
    },
  });

  const project = watch("project");
  const typeOfWork = watch("typeOfWork");
  const hours = watch("hours");

  useEffect(() => {
    if (isOpen) {
      if (initialTask) {
        reset({
          project: initialTask.project.toLowerCase().includes("b") ? "project-b" : "project-a",
          typeOfWork: "bug-fixes",
          description: initialTask.title || "",
          hours: initialTask.hours || 1,
        });
      } else {
        reset({
          project: "",
          typeOfWork: "",
          description: "",
          hours: 1,
        });
      }
    }
  }, [initialTask, isOpen, reset]);

  const onSubmit = (data: EntryFormData) => {
    console.log(initialTask ? "Task Updated:" : "Form Submitted:", {
      id: initialTask?.id,
      ...data,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-161.5 p-0 gap-0">
        <DialogHeader className="border-b border-gray-300 p-5">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {initialTask ? "Edit Entry" : "Add New Entry"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
          <FieldGroup>
            {/* Project Field */}
            <Field className="max-w-91 w-full">
              <FieldLabel className="text-gray-900">Select Project *</FieldLabel>
              <Select
                onValueChange={(val) => setValue("project", val ?? "", { shouldValidate: true })}
                value={project}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Project Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project-a">Project A</SelectItem>
                  <SelectItem value="project-b">Project B</SelectItem>
                </SelectContent>
              </Select>
              {errors.project && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.project.message}
                </p>
              )}
            </Field>

            {/* Type of Work Field */}
            <Field className="max-w-91 w-full">
              <FieldLabel className="text-gray-900">Type of Work *</FieldLabel>
              <Select
                onValueChange={(val) => setValue("typeOfWork", val ?? "", { shouldValidate: true })}
                value={typeOfWork}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Bug fixes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug-fixes">Bug fixes</SelectItem>
                  <SelectItem value="feature">Feature Development</SelectItem>
                </SelectContent>
              </Select>
              {errors.typeOfWork && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.typeOfWork.message}
                </p>
              )}
            </Field>

            {/* Description Field */}
            <Field className="max-w-123.5 w-full">
              <FieldLabel className="text-gray-900">Task description *</FieldLabel>
              <Textarea
                placeholder="Write text here ..."
                className="resize-none min-h-25 max-h-28.75 sm:max-h-40.75"
                maxLength={1000}
                {...register("description")}
              />
              <FieldDescription>A note for extra info</FieldDescription>
              {errors.description && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
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
                  onClick={() =>
                    setValue("hours", Math.max(1, (hours || 1) - 1), { shouldValidate: true })
                  }
                >
                  -
                </Button>
                <Input
                  type="number"
                  min={1}
                  max={24}
                  className="text-center h-9 py-2 px-3 tracking-tight text-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-none"
                  {...register("hours", { valueAsNumber: true })}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shrink-0 cursor-pointer rounded-none rounded-r-lg border-l-0 bg-gray-100"
                  onClick={() =>
                    setValue("hours", Math.min(24, (hours || 1) + 1), { shouldValidate: true })
                  }
                >
                  +
                </Button>
              </div>
              {errors.hours && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {errors.hours.message}
                </p>
              )}
            </Field>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                {isSubmitting
                  ? "Saving..."
                  : initialTask
                    ? "Save changes"
                    : "Add entry"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 cursor-pointer"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
