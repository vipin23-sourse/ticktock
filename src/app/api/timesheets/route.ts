import { TimesheetEntry, timesheets } from '@/lib/dummyData'
import { NextResponse } from 'next/server'


export async function GET() {
  try{
    return NextResponse.json({data:timesheets}, {status:200});
  } catch (error){
    return NextResponse.json({error:"Failed to fetch timesheet"},{status:500});
  }
}

export async function POST(request:Request) {
    try{
        const body = await request.json();
        if(!body.weekNumber || !body.date || !body.status){
            return NextResponse.json({error:"Missing required fields"}, {status:400})
        }

        const newEntry: TimesheetEntry ={
            id: Math.random().toString(36).substring(7),
            weekNumber:body.weekNumber,
            date:body.date,
            status:body.status
        };

        timesheets.push(newEntry);

        return NextResponse.json({data:newEntry, message:"Timesheet created successfully"});
    }
    catch(error){
        return NextResponse.json({error:"faild to create a timesheet"}, {status:500})
    }

}