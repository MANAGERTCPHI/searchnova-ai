import type { KeywordIdea, KeywordIntent, ResearchResult } from "./types";

const QUESTION_PREFIXES = ["how", "what", "why", "when", "where", "can", "is"];
const COMMERCIAL_MODIFIERS = ["best", "top", "review", "comparison", "alternative", "vs"];
const TRANSACTIONAL_MODIFIERS = ["buy", "pricing", "cost", "services", "agency", "tool"];

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function inferIntent(keyword: string): KeywordIntent {
  const value = normalize(keyword);
  if (/\b(buy|price|pricing|cost|hire|service|order|deal)\b/.test(value)) return "transactional";
  if (/\b(best|top|review|comparison|alternative|vs)\b/.test(value)) return "commercial";
  if (/\b(login|official|website|contact)\b/.test(value)) return "navigational";
  return "informational";
}

function difficulty(keyword: string): KeywordIdea["difficulty"] {
  const words = normalize(keyword).split(" ").filter(Boolean).length;
  if (words >= 5) return "easy";
  if (words >= 3) return "medium";
  return "hard";
}

function addIdea(list: KeywordIdea[], keyword: string, source: KeywordIdea["source"], relevance: number) {
  const value = normalize(keyword);
  if (!value || list.some((item) => item.keyword === value)) return;
  list.push({ keyword: value, source, relevance, intent: inferIntent(value), difficulty: difficulty(value) });
}

export function researchKeyword(seedInput: string): ResearchResult {
  const seed = normalize(seedInput);
  if (!seed) throw new Error("A keyword is required");

  const ideas: KeywordIdea[] = [];
  addIdea(ideas, seed, "seed", 100);

  for (const modifier of COMMERCIAL_MODIFIERS) addIdea(ideas, `${modifier} ${seed}`, "modifier", 88);
  for (const modifier of TRANSACTIONAL_MODIFIERS) addIdea(ideas, `${seed} ${modifier}`, "modifier", 84);
  for (const prefix of QUESTION_PREFIXES) addIdea(ideas, `${prefix} ${seed}`, "question", 80);
  addIdea(ideas, `${seed} for beginners`, "modifier", 78);
  addIdea(ideas, `${seed} guide`, "modifier", 77);
  addIdea(ideas, `${seed} tips`, "modifier", 76);
  addIdea(ideas, `${seed} examples`, "modifier", 75);
  addIdea(ideas, `${seed} strategy`, "modifier", 74);
  addIdea(ideas, `${seed} checklist`, "modifier", 73);

  const questions = [
    `What is ${seed}?`,
    `How does ${seed} work?`,
    `How do you use ${seed}?`,
    `What are the benefits of ${seed}?`,
    `How much does ${seed} cost?`,
    `What is the best ${seed}?`,
  ];

  const contentIdeas = [
    `${seed}: The Complete Beginner's Guide`,
    `10 Practical ${seed} Strategies That Work`,
    `${seed} vs Alternatives: What Should You Choose?`,
    `The Ultimate ${seed} Checklist`,
    `Common ${seed} Mistakes and How to Avoid Them`,
  ];

  return {
    seed,
    ideas: ideas.sort((a, b) => b.relevance - a.relevance),
    questions,
    contentIdeas,
    generatedAt: new Date().toISOString(),
  };
}
