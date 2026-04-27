create extension if not exists "pgcrypto";

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null,
  full_name text not null,
  email text not null,
  department_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists user_roles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  role_id uuid not null references roles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (profile_id, role_id)
);
