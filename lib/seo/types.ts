export type KeywordIntent = "informational" | "commercial" | "transactional" | "navigational";

export interface KeywordIdea {
  keyword: string;
  intent: KeywordIntent;
  relevance: number;
  difficulty: "easy" | "medium" | "hard";
  source: "seed" | "question" | "comparison" | "modifier";
}

export interface ResearchResult {
  seed: string;
  ideas: KeywordIdea[];
  questions: string[];
  contentIdeas: string[];
  generatedAt: string;
}
