"use client";

import { useState } from "react";

export default function Admin() {
  const [form, setForm] = useState({
    senderName: "",
    receiverName: "",
    receiverAddress: "",
    parcelDescription: "",
    weight: "",
  });

  const [trackingNumber, setTrackingNumber] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function registerParcel(e) {
    e.preventDefault();

    const number =
      "RSS-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(100000 + Math.random() * 900000);

    setTrackingNumber(number);
  }

  return (
    <main style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1>Republic Shipping Service</h1>
      <h2>Parcel Registration</h2>

      <form onSubmit={registerParcel}>
        <label>Sender Name</label>
        <input
          name="senderName"
          value={form.senderName}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "12px", margin: "8px 0 16px" }}
        />

        <label>Receiver Name</label>
        <input
          name="receiverName"
          value={form.receiverName}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "12px", margin: "8px 0 16px" }}
        />

        <label>Receiver Address</label>
        <textarea
          name="receiverAddress"
          value={form.receiverAddress}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "12px", margin: "8px 0 16px" }}
        />

        <label>Parcel Description</label>
        <input
          name="parcelDescription"
          value={form.parcelDescription}
          onChange={handleChange}
          required
          placeholder="e.g. Documents"
          style={{ width: "100%", padding: "12px", margin: "8px 0 16px" }}
        />

        <label>Weight (kg)</label>
        <input
          name="weight"
          type="number"
          value={form.weight}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "12px", margin: "8px 0 16px" }}
        />

        <button
          type="submit"
          style={{ padding: "12px 20px", cursor: "pointer" }}
        >
          Register Parcel
        </button>
      </form>

      {trackingNumber && (
        <section style={{ marginTop: "30px" }}>
          <h3>Parcel Registered</h3>
          <p>Your Tracking Number:</p>
          <strong>{trackingNumber}</strong>
          <p>Status: Registered</p>
        </section>
      )}
    </main>
  );
}
