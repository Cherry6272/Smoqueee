"use client";

import { motion } from "framer-motion";
import { Navigation, MessageCircle, Clock, ShieldCheck, Car } from "lucide-react";
import styles from "./StoreLocation.module.css";

export function StoreLocation() {
  return (
    <section className={styles.section} id="store">
      <div className={styles.content}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Physical Flagship
        </motion.span>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Experience Smoquee in person.
        </motion.h2>

        <motion.div
          className={styles.addressBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className={styles.storeName}>SMOQUEE</h3>
          <p className={styles.address}>
            Thanisandra Main Road<br />
            Bengaluru, Karnataka 560077
          </p>
        </motion.div>

        <motion.div
          className={styles.storePillars}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.pillarItem}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock size={16} color="var(--accent-primary)" />
              <span className={styles.pillarTitle}>Open Daily</span>
            </div>
            <p className={styles.pillarDesc}>10:00 AM – 11:00 PM</p>
          </div>

          <div className={styles.pillarItem}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ShieldCheck size={16} color="var(--accent-primary)" />
              <span className={styles.pillarTitle}>Climate Controlled</span>
            </div>
            <p className={styles.pillarDesc}>Certified humidor & storage</p>
          </div>

          <div className={styles.pillarItem}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Car size={16} color="var(--accent-primary)" />
              <span className={styles.pillarTitle}>Accessibility</span>
            </div>
            <p className={styles.pillarDesc}>On-site & street parking</p>
          </div>

          <div className={styles.pillarItem}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MessageCircle size={16} color="var(--accent-primary)" />
              <span className={styles.pillarTitle}>In-Store Concierge</span>
            </div>
            <p className={styles.pillarDesc}>Private sampling & consultation</p>
          </div>
        </motion.div>

        <motion.div
          className={styles.buttonRow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="https://maps.google.com/?q=Thanisandra+Main+Road+Bengaluru"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directionsBtn}
          >
            Get Directions <Navigation size={16} />
          </a>

          <a
            href="https://wa.me/?text=Hello%20SMOQUEE,%20I'm%20planning%20to%20visit%20your%20Thanisandra%20store%20in%20Bengaluru."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.conciergeBtn}
          >
            WhatsApp Concierge <MessageCircle size={16} />
          </a>
        </motion.div>
      </div>

      <motion.div
        className={styles.visual}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <iframe
          className={styles.mapFrame}
          title="SMOQUEE Thanisandra Main Road Store Location"
          src="https://maps.google.com/maps?q=Thanisandra%20Main%20Road,%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          allowFullScreen
        />
        <div className={styles.mapOverlayBadge}>
          <div className={styles.pulseDot} />
          <span>SMOQUEE Flagship · Thanisandra Main Road</span>
        </div>
      </motion.div>
    </section>
  );
}
