create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.researches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  query text not null,
  language text not null default 'English',
  country text not null default 'Nigeria',
  created_at timestamptz not null default now()
);

create table if not exists public.keywords (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  research_id uuid references public.researches(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  keyword text not null,
  intent text,
  difficulty integer check (difficulty between 0 and 100),
  opportunity integer check (opportunity between 0 and 100),
  is_saved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists projects_user_id_idx on public.projects(user_id);
create index if not exists researches_user_id_idx on public.researches(user_id);
create index if not exists keywords_user_id_idx on public.keywords(user_id);
create index if not exists keywords_research_id_idx on public.keywords(research_id);

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.researches enable row level security;
alter table public.keywords enable row level security;

create policy "profiles own row" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "projects own rows" on public.projects for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "researches own rows" on public.researches for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "keywords own rows" on public.keywords for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
