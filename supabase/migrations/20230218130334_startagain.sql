drop table if exists schedules cascade;
drop table if exists timeslots cascade;

create table events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  start_date timestamptz not null,
  end_date timestamptz not null,
  timezone text not null,
  options jsonb default '{}',
  created_at timestamptz default now() not null
);

create table availabilities (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id),
  date date not null,
  timeslots text[] not null,
  created_at timestamptz default now() not null
);
create index on availabilities (event_id);
