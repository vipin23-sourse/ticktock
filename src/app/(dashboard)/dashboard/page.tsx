"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Define the type based on your API structure
type TimesheetEntry = {
  id: string | number;
  dateRange: string;
  status: string;
  action: string;
}

// Reusable Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status.toUpperCase()) {
    case 'COMPLETED':
      return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold tracking-wider">COMPLETED</span>
    case 'INCOMPLETE':
      return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold tracking-wider">INCOMPLETE</span>
    case 'MISSING':
      return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold tracking-wider">MISSING</span>
    default:
      return null
  }
}

export default function DashboardPage() {
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from the internal API route on component mount
  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await fetch('/api/timesheets');
        if (!response.ok) throw new Error("Failed to fetch data");
        
        const json = await response.json();
        // Assuming your API returns { data: [...] }
        setTimesheets(json.data);
      } catch (err) {
        setError("Could not load timesheets. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimesheets();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Timesheets</h2>
        
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jan">January 2024</SelectItem>
              <SelectItem value="feb">February 2024</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
              <SelectItem value="missing">Missing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Data Table with Loading and Error States */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="w-[100px] text-xs font-semibold text-gray-500 uppercase tracking-wider">Week #</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                    Loading timesheets...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-red-500">
                    {error}
                  </TableCell>
                </TableRow>
              ) : (
                timesheets.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium text-gray-900">{row.id}</TableCell>
                    <TableCell className="text-gray-600">{row.dateRange}</TableCell>
                    <TableCell>
                      <StatusBadge status={row.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Link 
                        href={`/dashboard/${row.id}`}
                        className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                      >
                        {row.action}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <span className="border border-gray-200 rounded-md px-3 py-1.5 bg-gray-50">
              5 per page <span className="ml-2 text-xs">▼</span>
            </span>
          </div>
          
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" className="text-gray-500" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive className="bg-primary text-white hover:bg-primary hover:text-white">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" className="text-gray-500" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

      </div>
    </div>
  )
}