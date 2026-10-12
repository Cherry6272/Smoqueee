"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import styles from "./StoreLocation.module.css";

export function StoreLocation() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Come find us.
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
            Bengaluru, Karnataka
          </p>
        </motion.div>

        <motion.a 
          href="https://maps.google.com/?q=Smoquee+Thanisandra+Main+Road+Bengaluru"
          target="_blank"
          rel="noreferrer"
          className={styles.directionsBtn}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Get Directions <Navigation size={16} />
        </motion.a>
      </div>

      <motion.div 
        className={styles.visual}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className={styles.mapPlaceholder}>
          Interactive Map / Store Visual
          <div className={styles.mapMarker}></div>
        </div>
      </motion.div>
    </section>
  );
}
