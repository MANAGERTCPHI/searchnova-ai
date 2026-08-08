import { NextResponse } from "next/server";
import { z } from "zod";
import { researchKeyword } from "@/lib/seo/engine";

const requestSchema = z.object({
  keyword: z.string().trim().min(2).max(120),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Enter a keyword between 2 and 120 characters." },
        { status: 400 },
      );
    }

    return NextResponse.json(researchKeyword(parsed.data.keyword), { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unable to generate keyword research." },
      { status: 500 },
    );
  }
}
