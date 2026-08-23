import { getWeekDetailsById } from "@/lib/dummyData";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ weekId: string }> }
) {
  try {
    const { weekId } = await params;
    const weekDetails = getWeekDetailsById(weekId);

    if (!weekDetails) {
      return NextResponse.json({ error: "Week not found" }, { status: 404 });
    }

    return NextResponse.json({ data: weekDetails }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch week details" },
      { status: 500 }
    );
  }
}
