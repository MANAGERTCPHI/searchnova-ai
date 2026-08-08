create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  plan text not null default 'free' check (plan in ('free','pro','agency')),
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
  country text not null default 'US',
  result_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.keywords (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  research_id uuid references public.researches(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  keyword text not null,
  intent text,
  difficulty integer,
  opportunity integer,
  is_saved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists projects_user_id_idx on public.projects(user_id);
create index if not exists researches_user_id_idx on public.researches(user_id);
create index if not exists researches_project_id_idx on public.researches(project_id);
create index if not exists keywords_user_id_idx on public.keywords(user_id);
create index if not exists keywords_project_id_idx on public.keywords(project_id);
create index if not exists keywords_saved_idx on public.keywords(user_id, is_saved);

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.researches enable row level security;
alter table public.keywords enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

drop policy if exists "projects_all_own" on public.projects;
create policy "projects_all_own" on public.projects for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "researches_all_own" on public.researches;
create policy "researches_all_own" on public.researches for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "keywords_all_own" on public.keywords;
create policy "keywords_all_own" on public.keywords for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
