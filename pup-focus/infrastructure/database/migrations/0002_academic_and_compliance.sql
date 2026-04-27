create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists curricula (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs(id) on delete cascade,
  code text not null,
  name text not null,
  created_at timestamptz not null default now(),
  unique (program_id, code)
);

create table if not exists compliance_template_items (
  id uuid primary key default gen_random_uuid(),
  curriculum_id uuid not null references curricula(id) on delete cascade,
  requirement_code text not null,
  is_required boolean not null default true,
  due_offset_days int not null default 30,
  created_at timestamptz not null default now(),
  unique (curriculum_id, requirement_code)
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  faculty_profile_id uuid not null references profiles(id) on delete cascade,
  curriculum_id uuid not null references curricula(id) on delete cascade,
  requirement_code text not null,
  status text not null default 'draft',
  due_at timestamptz,
  submitted_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists document_versions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions(id) on delete cascade,
  version_number int not null,
  storage_path text not null,
  mime_type text not null,
  size_bytes bigint not null,
  checksum_sha256 text not null,
  created_by uuid not null,
  created_at timestamptz not null default now(),
  unique (submission_id, version_number)
);

create table if not exists review_decisions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions(id) on delete cascade,
  reviewer_profile_id uuid not null references profiles(id) on delete cascade,
  decision text not null,
  remarks text,
  created_at timestamptz not null default now()
);
