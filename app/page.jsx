"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    sender_name: "",
    sender_location: "",
    sender_email: "",
    sender_phone: "",
    receiver_name: "",
    receiver_address: "",
    receiver_email: "",
    receiver_phone: "",
    receiver_country: "",
    parcel_description: "",
    weight: "1",
    departure_date: "",
    departure_time: "",
    arrival_date: "",
    arrival_time: "",
    amount_paid: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setTrackingNumber("");

    try {
      const response = await fetch("/api/shipments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "The server returned an invalid response. Please try again."
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "Could not register parcel.");
      }

      setTrackingNumber(data.tracking_number);
      setMessage("Parcel registered successfully!");

      setForm({
        sender_name: "",
        sender_location: "",
        sender_email: "",
        sender_phone: "",
        receiver_name: "",
        receiver_address: "",
        receiver_email: "",
        receiver_phone: "",
        receiver_country: "",
        parcel_description: "",
        weight: "1",
        departure_date: "",
        departure_time: "",
        arrival_date: "",
        arrival_time: "",
        amount_paid: "",
      });
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  }

  const fields = [
    ["sender_name", "Sender Name", "text"],
    ["sender_location", "Sender Location", "text"],
    ["sender_email", "Sender Email", "email"],
    ["sender_phone", "Sender Phone", "tel"],
    ["receiver_name", "Receiver Name", "text"],
    ["receiver_address", "Receiver Address", "text"],
    ["receiver_email", "Receiver Email", "email"],
    ["receiver_phone", "Receiver Phone", "tel"],
    ["receiver_country", "Receiver Country", "text"],
    ["parcel_description", "Parcel Description", "text"],
    ["weight", "Parcel Weight (kg)", "number"],
    ["departure_date", "Departure Date", "date"],
    ["departure_time", "Departure Time", "time"],
    ["arrival_date", "Arrival Date", "date"],
    ["arrival_time", "Arrival Time", "time"],
    ["amount_paid", "Amount Paid", "number"],
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "30px 15px",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          Republic Shipping Service
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Register and track your parcel
        </p>

        <form onSubmit={handleSubmit}>
          {fields.map(([name, label, type]) => (
            <div key={name} style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "7px",
                }}
              >
                {label}
              </label>

              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                required
                min={type === "number" ? "0" : undefined}
                step={name === "weight" ? "0.01" : undefined}
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              background: "#111827",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            {loading ? "Registering..." : "Register Parcel"}
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: "25px",
              padding: "18px",
              borderRadius: "10px",
              background: trackingNumber ? "#dcfce7" : "#fee2e2",
              color: trackingNumber ? "#166534" : "#991b1b",
              fontWeight: "bold",
            }}
          >
            {message}

            {trackingNumber && (
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "24px",
                }}
              >
                Tracking Number:
                <br />
                {trackingNumber}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
