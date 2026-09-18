import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const year = new Date().getFullYear();

    const { count, error: countError } = await supabase
      .from("shipments")
      .select("*", { count: "exact", head: true });

    if (countError) {
      return NextResponse.json(
        { error: countError.message },
        { status: 400 }
      );
    }

    const tracking = `RSS-${year}-${String((count || 0) + 1).padStart(6, "0")}`;

    const { data, error } = await supabase
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

    await supabase.from("shipment_events").insert({
      shipment_id: data.id,
      status: data.status,
      location: data.current_location || data.origin || "",
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