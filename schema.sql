create type shipment_status as enum ('Shipment Created','Picked Up','Processing','In Transit','Arrived at Hub','Out for Delivery','Delivered');
create table if not exists shipments (
 id uuid primary key default gen_random_uuid(),
 tracking_number text unique not null,
 sender_name text not null,
 sender_phone text,
 recipient_name text not null,
 recipient_phone text,
 origin text not null,
 destination text not null,
 package_description text,
 current_location text,
 status shipment_status not null default 'Shipment Created',
 estimated_delivery date,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists shipment_events (
 id uuid primary key default gen_random_uuid(),
 shipment_id uuid not null references shipments(id) on delete cascade,
 status shipment_status not null,
 location text,
 note text,
 created_at timestamptz not null default now()
);
create index if not exists shipments_tracking_idx on shipments(tracking_number);
create index if not exists events_shipment_idx on shipment_events(shipment_id,created_at desc);
alter table shipments enable row level security;
alter table shipment_events enable row level security;

-- Public customers may look up shipments by exact tracking number.
create policy "public can read shipments" on shipments for select to anon using (true);
create policy "public can read shipment events" on shipment_events for select to anon using (true);

-- For production: restrict inserts/updates to authenticated staff only.
grant select on shipments, shipment_events to anon;
grant select,insert,update,delete on shipments, shipment_events to authenticated;

create or replace function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at=now(); return new; end $$;
drop trigger if exists shipments_updated_at on shipments;
create trigger shipments_updated_at before update on shipments for each row execute function set_updated_at();
