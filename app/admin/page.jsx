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
  const [loading, setLoading] = useState(false);

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

    const trackingNumber =
      "RSS-" + Math.floor(10000000 + Math.random() * 90000000);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/shipments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            tracking_number: trackingNumber,
            sender_name: form.senderName,
            sender_location: form.senderLocation,
            sender_email: form.senderEmail,
            receiver_name: form.receiverName,
            receiver_address: form.receiverAddress,
            receiver_email: form.receiverEmail,
            receiver_phone: form.receiverPhone,
            receiver_country: form.receiverCountry,
            parcel_description: form.parcelDescription,
            weight: form.weight,
            departure_date: form.departureDate || null,
            departure_time: form.departureTime || null,
            arrival_date: form.arrivalDate || null,
            arrival_time: form.arrivalTime || null,
            amount_paid: form.amountPaid,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setMessage(
        `Parcel registered successfully. Tracking Number: ${trackingNumber}`
      );

      setForm({
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
    } catch (error) {
      setMessage("Error: Could not register the parcel.");
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
    ["weight", "Parcel Weight", "text"],
    ["departureDate", "Departure Date", "date"],
    ["departureTime", "Departure Time", "time"],
    ["arrivalDate", "Arrival Date", "date"],
    ["arrivalTime", "Arrival Time", "time"],
    ["amountPaid", "Amount Paid", "number"],
  ];

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
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>
          Republic Shipping Service
        </h1>

        <h2>Admin Dashboard</h2>

        <p style={{ color: "#666" }}>Parcel Registration</p>

        <form onSubmit={handleSubmit}>
          {fields.map(([name, label, type]) => (
            <div key={name} style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight
