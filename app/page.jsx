"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function trackShipment(e) {
    e.preventDefault();

    const number = trackingNumber.trim();

    if (!number) {
      setMessage("Please enter your tracking number.");
      setShipment(null);
      setEvents([]);
      return;
    }

    setLoading(true);
    setMessage("");
    setShipment(null);
    setEvents([]);

    const { data, error } = await supabase
      .from("shipments")
      .select("*")
      .eq("tracking_number", number)
      .maybeSingle();

    if (error) {
      setMessage("Unable to check tracking right now.");
      setLoading(false);
      return;
    }

    if (!data) {
      setMessage("Tracking number not found.");
      setLoading(false);
      return;
    }

    setShipment(data);

    const { data: eventData } = await supabase
      .from("shipment_events")
      .select("*")
      .eq("shipment_id", data.id)
      .order("created_at", { ascending: false });

    setEvents(eventData || []);
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <header style={{ textAlign: "center", marginBottom: 40 }}>
        <h1>REPUBLIC SHIPPING SERVICE</h1>
        <p>FAST • SAFE • TRACKABLE</p>
        <p>
          Reliable international shipping and logistics services connecting
          people and businesses around the world.
        </p>
      </header>

      <section style={{ marginBottom: 40 }}>
        <h2>About Republic Shipping Service</h2>
        <p>
          Republic Shipping Service provides international shipping,
          transportation and shipment tracking services for customers
          worldwide.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Our Services</h2>
        <ul>
          <li>International Shipping</li>
          <li>Parcel Shipping</li>
          <li>Goods Transportation</li>
          <li>Shipment Tracking</li>
          <li>Worldwide Delivery</li>
        </ul>
      </section>

      <section>
        <h2>Track Your Shipment</h2>

        <form onSubmit={trackShipment}>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="RSS-2026-000001"
            required
            style={{
              width: "100%",
              padding: 14,
              marginBottom: 12,
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 14,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Checking..." : "Track Shipment"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: 20, fontWeight: "bold" }}>{message}</p>
        )}

        {shipment && (
          <div style={{ marginTop: 30 }}>
            <h3>Shipment Details</h3>

            <p>
              <strong>Tracking Number:</strong> {shipment.tracking_number}
            </p>

            <p>
              <strong>Status:</strong> {shipment.status}
            </p>

            <p>
              <strong>Current Location:</strong>{" "}
              {shipment.current_location || "Not available"}
            </p>

            <p>
              <strong>Origin:</strong> {shipment.origin}
            </p>

            <p>
              <strong>Destination:</strong> {shipment.destination}
            </p>

            <p>
              <strong>Package:</strong>{" "}
              {shipment.package_description || "Not available"}
            </p>

            <p>
              <strong>Estimated Delivery:</strong>{" "}
              {shipment.estimated_delivery || "Not available"}
            </p>

            {events.length > 0 && (
              <>
                <h3 style={{ marginTop: 30 }}>Shipment History</h3>

                {events.map((event) => (
                  <div
                    key={event.id}
                    style={{
                      padding: 15,
                      marginBottom: 10,
                      border: "1px solid #ccc",
                      borderRadius: 8,
                    }}
                  >
                    <strong>{event.status}</strong>

                    {event.location && (
                      <p>Location: {event.location}</p>
                    )}

                    {event.note && <p>{event.note}</p>}

                    <small>
                      {new Date(event.created_at).toLocaleString()}
                    </small>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </section>

      <footer style={{ marginTop: 50, textAlign: "center" }}>
        <p>© Republic Shipping Service</p>
      </footer>
    </main>
  );
}
