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
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    amountPaid: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function registerParcel(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not register the parcel.");
      }

      setMessage(
        `Parcel registered successfully! Tracking Number: ${result.tracking_number}`
      );

      setForm({
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
        departureDate: "",
        departureTime: "",
        arrivalDate: "",
        arrivalTime: "",
        amountPaid: "",
      });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }

    setLoading(false);
  }

  const fields = [
    ["senderName", "Sender Name", "text"],
    ["senderLocation", "Sender Location", "text"],
    ["senderEmail", "Sender Email", "email"],
    ["receiverName", "Receiver Name", "text"],
    ["receiverAddress", "Receiver Address", "text"],
    ["receiverEmail", "Receiver Email", "email"],
    ["receiverPhone", "Receiver Phone", "tel"],
    ["receiverCountry", "Receiver Country", "text"],
    ["parcelDescription", "Parcel Description", "text"],
    ["weight", "Parcel Weight (kg)", "number"],
    ["departureDate", "Departure Date", "date"],
    ["departureTime", "Departure Time", "time"],
    ["arrivalDate", "Arrival Date", "date"],
    ["arrivalTime", "Arrival Time", "time"],
    ["amountPaid", "Amount Paid", "number"],
  ];

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Republic Shipping Service</h1>
        <h2 style={styles.heading}>Parcel Registration</h2>

        <form onSubmit={registerParcel} style={styles.form}>
          {fields.map(([name, label, type]) => (
            <div key={name} style={styles.field}>
              <label style={styles.label}>{label}</label>

              {name === "receiverAddress" ||
              name === "parcelDescription" ? (
                <textarea
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  rows={3}
                />
              ) : (
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  required
                  step={type === "number" ? "0.01" : undefined}
                  style={styles.input}
                />
              )}
            </div>
          ))}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Registering..." : "Register Parcel"}
          </button>

          {message && (
            <div
              style={
                message.startsWith("Error")
                  ? styles.error
                  : styles.success
              }
            >
              {message}
            </div>
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
  },

  container: {
    maxWidth: "600px",
    margin: "0 auto",
    background: "#ffffff",
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
  },

  title: {
    marginTop: 0,
    marginBottom: "8px",
    fontSize: "30px",
  },

  heading: {
    marginTop: 0,
    marginBottom: "25px",
    fontSize: "24px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  label: {
    fontWeight: "700",
    fontSize: "16px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },

  button: {
    padding: "15px",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
  },

  success: {
    padding: "14px",
    background: "#e8f5e9",
    color: "#166534",
    borderRadius: "8px",
    fontWeight: "600",
  },

  error: {
    padding: "14px",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: "8px",
    fontWeight: "600",
  },
};
