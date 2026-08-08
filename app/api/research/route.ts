import { NextResponse } from "next/server";
import { z } from "zod";
import { researchKeyword } from "@/lib/seo/engine";
import { createClient } from "@/lib/supabase/server";

const requestSchema = z.object({
  keyword: z.string().trim().min(2).max(120),
});

export async function POST(request: Request) {
  try {
    const parsed = requestSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Enter a keyword between 2 and 120 characters." },
        { status: 400 },
      );
    }

    const result = researchKeyword(parsed.data.keyword);

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from("keyword_researches").insert({
        user_id: user.id,
        seed: result.seed,
        result_count: result.ideas.length,
        questions: result.questions,
        content_ideas: result.contentIdeas,
      });

      if (error) {
        console.error("Research history insert failed", error);
      }
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Keyword research failed", error);
    return NextResponse.json(
      { error: "Unable to generate keyword research." },
      { status: 500 },
    );
  }
}
