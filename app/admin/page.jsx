"use client";

import { useState } from "react";

export default function Admin() {
  const [form, setForm] = useState({
    senderName: "",
    senderLocation: "Jordan",
    senderEmail: "",
    receiverName: "",
    receiverAddress: "",
    receiverEmail: "",
    receiverPhone: "",
    receiverCountry: "",
    parcelDescription: "",
    weight: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    amountPaid: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function registerParcel(e) {
    e.preventDefault();

    const trackingNumber =
      "RSS-" + Date.now().toString().slice(-8);

    setMessage(
      `Parcel registered successfully. Tracking Number: ${trackingNumber}`
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Republic Shipping Service</h1>

        <h2 style={styles.heading}>Parcel Registration</h2>

        <form onSubmit={registerParcel} style={styles.form}>
          <label>Sender Name</label>
          <input
            name="senderName"
            value={form.senderName}
            onChange={handleChange}
            required
          />

          <label>Sender Location</label>
          <input
            name="senderLocation"
            value={form.senderLocation}
            onChange={handleChange}
            required
          />

          <label>Sender Email</label>
          <input
            type="email"
            name="senderEmail"
            value={form.senderEmail}
            onChange={handleChange}
            required
          />

          <label>Receiver Name</label>
          <input
            name="receiverName"
            value={form.receiverName}
            onChange={handleChange}
            required
          />

          <label>Receiver Address</label>
          <textarea
            name="receiverAddress"
            value={form.receiverAddress}
            onChange={handleChange}
            required
          />

          <label>Receiver Email</label>
          <input
            type="email"
            name="receiverEmail"
            value={form.receiverEmail}
            onChange={handleChange}
            required
          />

          <label>Receiver Phone</label>
          <input
            type="tel"
            name="receiverPhone"
            value={form.receiverPhone}
            onChange={handleChange}
            required
          />

          <label>Receiver Country</label>
          <input
            name="receiverCountry"
            value={form.receiverCountry}
            onChange={handleChange}
            required
          />

          <label>Parcel Description</label>
          <textarea
            name="parcelDescription"
            value={form.parcelDescription}
            onChange={handleChange}
            required
          />

          <label>Weight (kg)</label>
          <input
            type="number"
            step="0.01"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            required
          />

          <label>Departure Date</label>
          <input
            type="date"
            name="departureDate"
            value={form.departureDate}
            onChange={handleChange}
            required
          />

          <label>Departure Time</label>
          <input
            type="time"
            name="departureTime"
            value={form.departureTime}
            onChange={handleChange}
            required
          />

          <label>Arrival Date</label>
          <input
            type="date"
            name="arrivalDate"
            value={form.arrivalDate}
            onChange={handleChange}
            required
          />

          <label>Arrival Time</label>
          <input
            type="time"
            name="arrivalTime"
            value={form.arrivalTime}
            onChange={handleChange}
            required
          />

          <label>Amount Paid</label>
          <input
            type="number"
            step="0.01"
            name="amountPaid"
            value={form.amountPaid}
            onChange={handleChange}
            required
          />

          <button type="submit">Register Parcel</button>

          {message && (
            <p style={styles.success}>{message}</p>
          )}
        </form>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fa",
    padding: "30px 16px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "600px",
    margin: "0 auto",
    background: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },

  title: {
    marginTop: 0,
    marginBottom: "10px",
    fontSize: "30px",
    lineHeight: "1.2",
  },

  heading: {
    marginTop: 0,
    marginBottom: "25px",
    fontSize: "24px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  label: {
    fontWeight: "600",
  },

  success: {
    padding: "12px",
    background: "#e8f5e9",
    borderRadius: "6px",
    fontWeight: "600",
  },
};
