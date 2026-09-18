import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const db = await createClient();

    const year = new Date().getFullYear();

    const { count, error: countError } = await db
      .from("shipments")
      .select("*", { count: "exact", head: true });

    if (countError) {
      return NextResponse.json(
        { error: countError.message },
        { status: 400 }
      );
    }

    const tracking = `RSS-${year}-${String((count || 0) + 1).padStart(6, "0")}`;

    const { data, error } = await db
      .from("shipments")
      .insert({
        ...body,
        tracking_number: tracking,
        status: "Shipment Created",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    await db.from("shipment_events").insert({
      shipment_id: data.id,
      status: data.status,
      location: data.current_location || data.origin,
      note: "Shipment created",
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
