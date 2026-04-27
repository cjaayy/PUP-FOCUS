alter table profiles enable row level security;
alter table submissions enable row level security;
alter table document_versions enable row level security;
alter table review_decisions enable row level security;

create policy "faculty_read_own_profile" on profiles
for select using (auth.uid() = user_id);

create policy "faculty_manage_own_submissions" on submissions
for all using (
  faculty_profile_id in (
    select id from profiles where user_id = auth.uid()
  )
)
with check (
  faculty_profile_id in (
    select id from profiles where user_id = auth.uid()
  )
);

create policy "faculty_read_own_documents" on document_versions
for select using (
  submission_id in (
    select id from submissions s
    where s.faculty_profile_id in (
      select id from profiles p where p.user_id = auth.uid()
    )
  )
);
