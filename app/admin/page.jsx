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

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("Parcel registration submitted successfully.");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f4f4",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        <h1>Republic Shipping Service</h1>
        <h2>Admin Dashboard</h2>

        <p>Parcel Registration</p>

        <form onSubmit={handleSubmit}>
          {[
            ["senderName", "Sender Name"],
            ["senderLocation", "Sender Location"],
            ["senderEmail", "Sender Email"],
            ["receiverName", "Receiver Name"],
            ["receiverEmail", "Receiver Email"],
            ["receiverPhone", "Receiver Phone"],
            ["receiverCountry", "Receiver Country"],
            ["weight", "Parcel Weight"],
            ["departureDate", "Departure Date"],
            ["departureTime", "Departure Time"],
            ["arrivalDate", "Arrival Date"],
            ["arrivalTime", "Arrival Time"],
            ["amountPaid", "Amount Paid"],
          ].map(([name, label]) => (
            <div key={name} style={{ marginBottom: "18px" }}>
              <label>{label}</label>
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                type={
                  name.includes("Date")
                    ? "date"
                    : name.includes("Time")
                    ? "time"
                    : name === "amountPaid" || name === "weight"
                    ? "number"
                    : "text"
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "6px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}

          <div style={{ marginBottom: "18px" }}>
            <label>Receiver Address</label>
            <textarea
              name="receiverAddress"
              value={form.receiverAddress}
              onChange={handleChange}
              rows="3"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label>Parcel Description</label>
            <textarea
              name="parcelDescription"
              value={form.parcelDescription}
              onChange={handleChange}
              rows="3"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Register Parcel
          </button>

          {message && (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
