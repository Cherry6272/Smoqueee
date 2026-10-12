"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("Product Availability & Imports");
  const [notes, setNotes] = useState("");

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello SMOQUEE Concierge,\n\nName: ${name || "Client"}\nInquiry Topic: ${topic}\nMessage: ${notes || "I'd like to inquire about products in your Thanisandra store."}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.container}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Private Concierge
        </motion.span>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Connect with SMOQUEE.
        </motion.h1>
        <motion.p
          className={styles.leadText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Whether you are seeking a specific European single-origin chocolate, an allocation of niche extrait perfumes, or custom cigar accessories, our boutique team is at your disposal.
        </motion.p>

        <div className={styles.contactGrid}>
          {/* Interactive Concierge Message Form */}
          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className={styles.formTitle}>Initiate Concierge Inquiry</h2>
            <form onSubmit={handleWhatsAppSubmit}>
              <div className={styles.inputGroup} style={{ marginBottom: "1.25rem" }}>
                <label htmlFor="name" className={styles.label}>
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Alex"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup} style={{ marginBottom: "1.25rem" }}>
                <label htmlFor="topic" className={styles.label}>
                  Inquiry Topic
                </label>
                <select
                  id="topic"
                  className={styles.select}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  <option value="Product Availability & Imports">
                    Product Availability & Imports
                  </option>
                  <option value="Imported Perfumes & Rare Extraits">
                    Imported Perfumes & Rare Extraits
                  </option>
                  <option value="Fine Smoke Accessories & Humidors">
                    Fine Smoke Accessories & Humidors
                  </option>
                  <option value="Single-Origin European Chocolates">
                    Single-Origin European Chocolates
                  </option>
                  <option value="Curated Corporate Gifting">
                    Curated Corporate Gifting
                  </option>
                  <option value="Private Store Visit & Sampling">
                    Private Store Visit & Sampling
                  </option>
                </select>
              </div>

              <div className={styles.inputGroup} style={{ marginBottom: "1.5rem" }}>
                <label htmlFor="notes" className={styles.label}>
                  Details or Specific Product Requests
                </label>
                <textarea
                  id="notes"
                  placeholder="Tell us what you are looking for..."
                  className={styles.textarea}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <MessageCircle size={18} /> Send via WhatsApp Concierge
              </button>
            </form>
          </motion.div>

          {/* Boutique Details & Direct Contacts */}
          <div className={styles.detailsCol}>
            <div className={styles.infoBlock}>
              <span className={styles.infoTitle}>Physical Flagship</span>
              <p className={styles.infoValue}>
                SMOQUEE
                <br />
                Thanisandra Main Road
                <br />
                Bengaluru, Karnataka 560077
              </p>
              <a
                href="https://maps.google.com/?q=Thanisandra+Main+Road+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directActionBtn}
              >
                Open Google Maps <ArrowRight size={14} />
              </a>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoTitle}>Flagship Hours</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                <Clock size={16} color="var(--accent-primary)" />
                <p className={styles.infoValue}>Monday – Sunday: 10:00 AM – 11:00 PM</p>
              </div>
              <p className={styles.infoSub}>Walk-ins welcome during all operating hours.</p>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoTitle}>Direct Inquiries</span>
              <p className={styles.infoValue}>In-Store Concierge Desk</p>
              <p className={styles.infoSub}>
                For instantaneous stock verification and reserved allocations, please connect via our verified WhatsApp concierge or visit our Thanisandra boutique directly.
              </p>
            </div>

            <div className={styles.verificationNotice}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <ShieldCheck size={16} color="var(--accent-primary)" />
                <strong style={{ color: "var(--text-primary)" }}>Age Verification Policy</strong>
              </div>
              Patrons inquiring about smoke accessories must be 18 years of age or older in compliance with applicable laws. Age verification is conducted upon store entry.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
