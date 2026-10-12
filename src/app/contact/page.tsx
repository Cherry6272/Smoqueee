"use client";

import { Navbar } from "@/components/Navbar";

export default function Contact() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "15vh", paddingLeft: "5%", paddingRight: "5%", minHeight: "100vh" }}>
        <h1 className="h1-display" style={{ marginBottom: "2rem" }}>Contact</h1>
        <p className="body-large" style={{ marginBottom: "4rem" }}>Get in touch with us for product inquiries, bulk orders, or store hours.</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "600px" }}>
          <div>
            <h3 className="h3-heading" style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Email</h3>
            <p className="body-base">hello@smoquee.com</p>
          </div>
          <div>
            <h3 className="h3-heading" style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Phone</h3>
            <p className="body-base">+91 98765 43210</p>
          </div>
          <div>
            <h3 className="h3-heading" style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Store Hours</h3>
            <p className="body-base">Monday - Sunday<br/>10:00 AM - 10:00 PM</p>
          </div>
        </div>
      </div>
    </main>
  );
}
