import type { KeywordIdea } from "@/lib/seo/types";

export function summarizeIdeas(ideas: KeywordIdea[]) {
  const total = ideas.length;
  const easy = ideas.filter((idea) => idea.difficulty === "easy").length;
  const medium = ideas.filter((idea) => idea.difficulty === "medium").length;
  const hard = ideas.filter((idea) => idea.difficulty === "hard").length;
  const averageRelevance = total === 0 ? 0 : Math.round(ideas.reduce((sum, idea) => sum + idea.relevance, 0) / total);

  return { total, easy, medium, hard, averageRelevance };
}
