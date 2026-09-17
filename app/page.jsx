"use client";

import { useState } from "react";

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [message, setMessage] = useState("");

  function trackShipment(e) {
    e.preventDefault();

    if (!trackingNumber.trim()) {
      setMessage("Please enter your tracking number.");
      return;
    }

    setMessage(`Tracking number received: ${trackingNumber.trim()}`);
  }

  return (
    <main>
      <h1>REPUBLIC SHIPPING SERVICE</h1>

      <a href="/admin">Admin</a>

      <p>FAST • SAFE • TRACKABLE</p>

      <h2>Track your shipment</h2>

      <p>
        Enter your tracking number to see live shipment information.
      </p>

      <form onSubmit={trackShipment}>
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="RSS-2026-000001"
        />

        <button type="submit">Track Shipment</button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}
