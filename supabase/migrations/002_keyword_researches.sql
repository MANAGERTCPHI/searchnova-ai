create table if not exists public.keyword_researches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  seed text not null,
  result_count integer not null default 0 check (result_count >= 0),
  questions jsonb not null default '[]'::jsonb,
  content_ideas jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists keyword_researches_user_created_idx
  on public.keyword_researches (user_id, created_at desc);

alter table public.keyword_researches enable row level security;

create policy "Users can view their own research"
  on public.keyword_researches for select
  using (auth.uid() = user_id);

create policy "Users can create their own research"
  on public.keyword_researches for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own research"
  on public.keyword_researches for delete
  using (auth.uid() = user_id);
