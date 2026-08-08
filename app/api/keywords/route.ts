import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const keywordSchema = z.object({
  keyword: z.string().trim().min(2).max(120),
  seed: z.string().trim().min(2).max(120),
  intent: z.enum(["informational", "commercial", "transactional", "navigational"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  relevance: z.number().int().min(0).max(100),
  source: z.enum(["seed", "question", "comparison", "modifier"]),
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const parsed = keywordSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid keyword data." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("saved_keywords")
      .upsert(
        { user_id: user.id, ...parsed.data },
        { onConflict: "user_id,keyword", ignoreDuplicates: false },
      )
      .select("id, keyword, created_at")
      .single();

    if (error) {
      console.error("Save keyword failed", error);
      return NextResponse.json({ error: "Unable to save keyword." }, { status: 500 });
    }

    return NextResponse.json({ saved: true, keyword: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save keyword." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const parsed = z.object({ keyword: z.string().trim().min(2).max(120) }).safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid keyword." }, { status: 400 });
    }

    const { error } = await supabase
      .from("saved_keywords")
      .delete()
      .eq("user_id", user.id)
      .eq("keyword", parsed.data.keyword);

    if (error) {
      console.error("Delete keyword failed", error);
      return NextResponse.json({ error: "Unable to remove keyword." }, { status: 500 });
    }

    return NextResponse.json({ saved: false });
  } catch {
    return NextResponse.json({ error: "Unable to remove keyword." }, { status: 500 });
  }
}
