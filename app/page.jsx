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

    setMessage(`Tracking number received: ${trackingNumber}`);
  }

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1>REPUBLIC SHIPPING SERVICE</h1>

        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          FAST • SAFE • TRACKABLE
        </p>

        <p>
          Reliable international shipping and logistics services connecting
          people and businesses around the world.
        </p>
      </section>

      <section style={{ marginBottom: "45px" }}>
        <h2>About Republic Shipping Service</h2>

        <p>
          Republic Shipping Service provides shipping solutions for parcels,
          goods, and shipments destined for locations around the world.
        </p>

        <p>
          Our service is focused on secure handling, reliable delivery, and
          shipment tracking from departure to arrival.
        </p>
      </section>

      <section style={{ marginBottom: "45px" }}>
        <h2>Our Services</h2>

        <ul style={{ lineHeight: "2" }}>
          <li>International Shipping</li>
          <li>Parcel Shipping</li>
          <li>Goods Transportation</li>
          <li>Shipment Tracking</li>
          <li>Worldwide Delivery</li>
        </ul>
      </section>

      <section
        style={{
          padding: "25px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          marginBottom: "45px",
        }}
      >
        <h2>Track Your Shipment</h2>

        <form onSubmit={trackShipment}>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number"
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "12px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              cursor: "pointer",
            }}
          >
            Track Shipment
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "15px" }}>
            {message}
          </p>
        )}
      </section>

      <footer
        style={{
          textAlign: "center",
          paddingTop: "25px",
          borderTop: "1px solid #ddd",
        }}
      >
        <p>REPUBLIC SHIPPING SERVICE</p>
        <p>Worldwide Shipping • Secure • Trackable</p>
      </footer>
    </main>
  );
}
