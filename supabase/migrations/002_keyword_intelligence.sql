create extension if not exists pgcrypto;

create table if not exists public.keyword_researches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  seed text not null check (char_length(seed) between 2 and 120),
  result_count integer not null default 0 check (result_count >= 0),
  questions jsonb not null default '[]'::jsonb,
  content_ideas jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_keywords (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  keyword text not null check (char_length(keyword) between 2 and 120),
  seed text not null check (char_length(seed) between 2 and 120),
  intent text not null check (intent in ('informational','commercial','transactional','navigational')),
  difficulty text not null check (difficulty in ('easy','medium','hard')),
  relevance integer not null check (relevance between 0 and 100),
  source text not null check (source in ('seed','question','comparison','modifier')),
  created_at timestamptz not null default now(),
  unique (user_id, keyword)
);

create index if not exists keyword_researches_user_created_idx
  on public.keyword_researches(user_id, created_at desc);

create index if not exists saved_keywords_user_created_idx
  on public.saved_keywords(user_id, created_at desc);

alter table public.keyword_researches enable row level security;
alter table public.saved_keywords enable row level security;

drop policy if exists "Users can read their research history" on public.keyword_researches;
create policy "Users can read their research history"
  on public.keyword_researches for select
  using (auth.uid() = user_id);

drop policy if exists "Users can create their research history" on public.keyword_researches;
create policy "Users can create their research history"
  on public.keyword_researches for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their research history" on public.keyword_researches;
create policy "Users can delete their research history"
  on public.keyword_researches for delete
  using (auth.uid() = user_id);

drop policy if exists "Users can read their saved keywords" on public.saved_keywords;
create policy "Users can read their saved keywords"
  on public.saved_keywords for select
  using (auth.uid() = user_id);

drop policy if exists "Users can save keywords" on public.saved_keywords;
create policy "Users can save keywords"
  on public.saved_keywords for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their saved keywords" on public.saved_keywords;
create policy "Users can delete their saved keywords"
  on public.saved_keywords for delete
  using (auth.uid() = user_id);
