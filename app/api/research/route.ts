import { NextResponse } from "next/server";
import { keywordResearchSchema } from "@/lib/validations/keyword";

const modifiers = [
  "guide",
  "tools",
  "tips",
  "for beginners",
  "2026",
  "examples",
  "best practices",
  "cost",
  "how to",
  "strategy",
  "services",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = keywordResearchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid research request.", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { query, language, country } = parsed.data;
    const ideas = modifiers.map((modifier, index) => ({
      keyword: `${query} ${modifier}`,
      intent: index % 3 === 0 ? "Informational" : index % 3 === 1 ? "Commercial" : "Transactional",
      difficulty: 20 + index * 6,
      opportunity: Math.max(35, 92 - index * 5),
    }));

    return NextResponse.json({
      query,
      language,
      country,
      ideas,
      source: "SearchNova research engine",
    });
  } catch {
    return NextResponse.json({ error: "Unable to process the research request." }, { status: 500 });
  }
}
