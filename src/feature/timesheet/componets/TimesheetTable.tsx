"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TimesheetEntry } from "@/lib/dummyData";

const StatusBadge = ({ status }: { status?: string }) => {
  if (!status) return null;
  switch (status.toUpperCase()) {
    case "COMPLETED":
      return <Badge className="bg-green-100 text-green-800">COMPLETED</Badge>;
    case "INCOMPLETE":
      return <Badge className="bg-yellow-100 text-yellow-800">INCOMPLETE</Badge>;
    case "MISSING":
      return <Badge className="bg-pink-100 text-pink-800">MISSING</Badge>;
    default:
      return null;
  }
};

interface TimesheetTableProps {
  initialTimesheets?: TimesheetEntry[];
}

export const TimesheetTable = ({ initialTimesheets = [] }: TimesheetTableProps) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  const filteredTimesheets = (initialTimesheets ?? []).filter((row) => {
    if (!row) return false;
    const matchesStatus =
      statusFilter === "all" ||
      (row.status ? row.status.toUpperCase() === statusFilter.toUpperCase() : false);
    const matchesDate =
      dateFilter === "all" ||
      (row.dateRange ? row.dateRange.toLowerCase().includes(dateFilter.toLowerCase()) : false);
    return matchesStatus && matchesDate;
  });

  return (
    <div className="w-full space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="text-2xl font-bold text-gray-900 mb-6">Your Timesheets</div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <Select value={dateFilter} onValueChange={(val) => setDateFilter(val ?? "all")}>
            <SelectTrigger className="min-w-35 max-w-min">
              <SelectValue className="text-gray-500" placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="january">January 2024</SelectItem>
              <SelectItem value="february">February 2024</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val ?? "all")}>
            <SelectTrigger className="min-w-35 max-w-min gap-10">
              <SelectValue placeholder="Status" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
              <SelectItem value="missing">Missing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Data Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[10%] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                    Week #
                    <ArrowDown className="size-3.5 text-gray-500" />
                  </div>
                </TableHead>
                <TableHead className="w-[40%] text-xs font-semibold text-gray-500 uppercase">
                  <div className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                    Date
                    <ArrowDown className="size-3.5 text-gray-500" />
                  </div>
                </TableHead>
                <TableHead className="w-[40%] text-xs font-semibold text-gray-500 uppercase">
                  <div className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                    Status
                    <ArrowDown className="size-3.5 text-gray-500" />
                  </div>
                </TableHead>
                <TableHead className="w-[10%] text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!filteredTimesheets || filteredTimesheets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                    No timesheets found matching your filter criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTimesheets.map((row) => (
                  <TableRow key={row?.id}>
                    <TableCell className="font-medium text-gray-900 bg-gray-50">
                      {row?.id ?? "-"}
                    </TableCell>
                    <TableCell className="text-gray-500">{row?.dateRange ?? ""}</TableCell>
                    <TableCell>
                      <StatusBadge status={row?.status} />
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.id != null && (
                        <Link
                          href={`/dashboard/${row.id}`}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                        >
                          {row?.action ?? "View"}
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mt-6">
          <div className="flex items-center text-sm text-gray-500">
            <Select defaultValue="5">
              <SelectTrigger id="select-rows-per-page">
                <SelectValue />
                <span>per page</span>
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Pagination className="sm:justify-end sm:ml-auto mr-auto sm:mr-0 ml-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="text-gray-500" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive
                  className="text-text-brand hover:bg-primary hover:text-white"
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">99</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="text-gray-500" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};
