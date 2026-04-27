insert into roles (code, name) values
  ('faculty', 'Faculty'),
  ('program_head', 'Program Head'),
  ('admin', 'Super Admin')
on conflict (code) do nothing;
