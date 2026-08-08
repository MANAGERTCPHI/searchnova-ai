import type { KeywordIdea } from "@/lib/seo/types";

export function keywordIdeasToCsv(ideas: KeywordIdea[]): string {
  const escape = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const rows = [
    ["Keyword", "Intent", "Difficulty", "Relevance", "Source"],
    ...ideas.map((idea) => [
      idea.keyword,
      idea.intent,
      idea.difficulty,
      idea.relevance,
      idea.source,
    ]),
  ];

  return rows.map((row) => row.map(escape).join(",")).join("\r\n");
}
