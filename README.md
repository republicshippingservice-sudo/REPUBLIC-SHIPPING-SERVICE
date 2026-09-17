# Republic Shipping Service — database-connected starter

## 1. Create Supabase
Create a Supabase project and open SQL Editor.

## 2. Run database schema
Copy `supabase/schema.sql` into Supabase SQL Editor and run it.

## 3. Configure environment
Copy `.env.example` to `.env.local` and enter your Supabase URL and publishable key.

## 4. Install and run
npm install
npm run dev

Open http://localhost:3000

The customer tracking page reads real rows from Supabase. `/api/shipments` creates shipments and automatically creates the first tracking event. The dashboard reads real shipment rows.

IMPORTANT: This starter is database-connected but the admin page is NOT authenticated yet. Before public deployment, add Supabase Auth and staff-only RLS policies. Never put a Supabase service-role key in browser/client code.
