import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const keywordSchema = z.object({
  keyword: z.string().trim().min(1).max(200),
  intent: z.string().trim().min(1).max(40),
  difficulty: z.string().trim().min(1).max(20),
  relevance: z.number().min(0).max(100),
});

const requestSchema = z.object({
  keywords: z.array(keywordSchema).min(1).max(1000),
});

function csvCell(value: string | number): string {
  const text = String(value).replace(/"/g, '""');
  return `"${text}"`;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid keyword export data." }, { status: 400 });
  }

  const header = ["Keyword", "Intent", "Difficulty", "Relevance"];
  const rows = parsed.data.keywords.map((item) => [
    item.keyword,
    item.intent,
    item.difficulty,
    item.relevance,
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="searchnova-keywords.csv"',
      "Cache-Control": "no-store",
    },
  });
}
