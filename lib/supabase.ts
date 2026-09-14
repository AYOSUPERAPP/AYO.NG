-- Enable RLS safely
alter table posts enable row level security;
alter table profiles enable row level security;
alter table scores enable row level security;
alter table withdrawals enable row level security;

-- Drop old policies if exist then create new
drop policy if exists "Allow all" on posts;
create policy "Allow all" on posts for all using (true) with check (true);

drop policy if exists "Allow all" on profiles;
create policy "Allow all" on profiles for all using (true) with check (true);

drop policy if exists "Allow all" on scores;
create policy "Allow all" on scores for all using (true) with check (true);

drop policy if exists "Allow all" on withdrawals;
create policy "Allow all" on withdrawals for all using (true) with check (true);

drop policy if exists "Public upload" on storage.objects;
create policy "Public upload" on storage.objects for insert with check (bucket_id = 'ayo-images');

drop policy if exists "Public view" on storage.objects;
create policy "Public view" on storage.objects for select using (bucket_id = 'ayo-images');
