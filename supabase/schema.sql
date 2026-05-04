-- =============================================
-- IELTS Writing Master — Supabase Schema
-- Supabase SQL Editor ga paste qiling va Run bosing
-- =============================================

-- 1. profiles table
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  created_at    timestamptz default now() not null,
  email         text not null,
  full_name     text,
  plan          text default 'free' check (plan in ('free', 'mastery')),
  essays_graded integer default 0,
  band_score_start    numeric(2,1),
  band_score_current  numeric(2,1),
  avatar_url    text,
  is_active     boolean default true
);

-- 2. Auto-create profile when user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer
as $$
begin
  insert into public.profiles (id, email, full_name, plan)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', null),
    coalesce(new.raw_user_meta_data->>'plan', 'free')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- 3. Trigger: fires after every new auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Users can read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Service role can read all (for admin panel)
create policy "Service role can read all profiles"
  on public.profiles for select
  using (auth.role() = 'service_role');

-- 5. Admin view: allow reading all profiles with anon key too
-- (Remove this in production — use service role key instead)
create policy "Authenticated users can read all profiles"
  on public.profiles for select
  to authenticated
  using (true);

-- Done!
select 'Schema created successfully! ✓' as status;
