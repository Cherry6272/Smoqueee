"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AgeGate.module.css";

export function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem("smoquee_age_verified");
    if (!isVerified) {
      // Delay slightly for cinematic effect
      const timer = setTimeout(() => setShow(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("smoquee_age_verified", "true");
    setShow(false);
  };

  const handleDeny = () => {
    window.location.href = "https://google.com"; // Or redirect to a safe page
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className={styles.title}>Welcome to SMOQUEE</h2>
            <p className={styles.description}>
              Some of our curated selections include premium smoke accessories. 
              You must be of legal smoking age in your jurisdiction to enter this site.
            </p>
            
            <div className={styles.actions}>
              <button className={styles.primaryBtn} onClick={handleVerify}>
                I am of legal age
              </button>
              <button className={styles.secondaryBtn} onClick={handleDeny}>
                I am not
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
