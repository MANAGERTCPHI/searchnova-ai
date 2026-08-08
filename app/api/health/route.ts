import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "searchnova-ai",
    timestamp: new Date().toISOString(),
  });
}
