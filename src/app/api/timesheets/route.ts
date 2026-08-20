import { TimesheetEntry, timesheets } from '@/lib/dummyData'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({ data: timesheets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch timesheet" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // We only validate 'date' and 'status' since 'id' (Week #) is auto-generated
    if (!body.date || !body.status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Auto-increment the ID based on the highest existing ID
    const nextId = timesheets.length > 0 
      ? Math.max(...timesheets.map(t => t.id)) + 1 
      : 1;

    // Structure must perfectly match the TimesheetEntry type
    const newEntry: TimesheetEntry = {
      id: nextId,
      dateRange: body.date,  // Map the incoming body.date to dateRange
      status: body.status,
      action: "View"         // Provide the required default action
    };

    timesheets.push(newEntry);

    return NextResponse.json(
      { data: newEntry, message: "Timesheet created successfully" }, 
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create a timesheet" }, 
      { status: 500 }
    );
  }
}