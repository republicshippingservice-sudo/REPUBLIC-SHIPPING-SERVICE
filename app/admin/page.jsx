"use client";

import { useState } from "react";

export default function Admin() {
  const [form, setForm] = useState({
    senderName: "",
    senderLocation: "",
    senderEmail: "",
    receiverName: "",
    receiverAddress: "",
    receiverEmail: "",
    receiverPhone: "",
    receiverCountry: "",
    parcelDescription: "",
    weight: "",
    departureDateTime: "",
    arrivalDateTime: "",
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
    <main style={{ maxWidth: "650px", margin: "40px auto", padding: "20px" }}>
      <h1>Republic Shipping Service</h1>
      <h2>Parcel Registration</h2>

      <form onSubmit={registerParcel}>
        <label>Sender Name</label>
        <input name="senderName" value={form.senderName} onChange={handleChange} required />

        <label>Sender Location</label>
        <input name="senderLocation" value={form.senderLocation} onChange={handleChange} required />

        <label>Sender Email</label>
        <input type="email" name="senderEmail" value={form.senderEmail} onChange={handleChange} required />

        <label>Receiver Name</label>
        <input name="receiverName" value={form.receiverName} onChange={handleChange} required />

        <label>Receiver Address</label>
        <textarea name="receiverAddress" value={form.receiverAddress} onChange={handleChange} required />

        <label>Receiver Email</label>
        <input type="email" name="receiverEmail" value={form.receiverEmail} onChange={handleChange} required />

        <label>Receiver Phone</label>
        <input type="tel" name="receiverPhone" value={form.receiverPhone} onChange={handleChange} required />

        <label>Receiver Country</label>
        <input name="receiverCountry" value={form.receiverCountry} onChange={handleChange} required />

        <label>Parcel Description</label>
        <input name="parcelDescription" value={form.parcelDescription} onChange={handleChange} required />

        <label>Weight (kg)</label>
        <input type="number" name="weight" value={form.weight} onChange={handleChange} required />

        <label>Departure Date & Time</label>
        <input type="datetime-local" name="departureDateTime" value={form.departureDateTime} onChange={handleChange} required />

        <label>Arrival Date & Time</label>
        <input type="datetime-local" name="arrivalDateTime" value={form.arrivalDateTime} onChange={handleChange} required />

        <button type="submit">Register Parcel</button>
      </form>

      {trackingNumber && (
        <section>
          <h3>Parcel Registered</h3>
          <p>Tracking Number:</p>
          <strong>{trackingNumber}</strong>
          <p>Status: Registered</p>
        </section>
      )}
    </main>
  );
}
