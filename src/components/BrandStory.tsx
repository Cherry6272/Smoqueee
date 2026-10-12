"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./BrandStory.module.css";

export function BrandStory() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const word1Active = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const word2Active = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const word3Active = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  return (
    <section className={styles.section} ref={containerRef}>
      <motion.div 
        className={styles.intro}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <span className={styles.introTitle}>Not your ordinary store.</span>
        <p className={styles.introCopy}>
          SMOQUEE brings together carefully selected imported products, premium accessories and unexpected finds under one roof.
        </p>
      </motion.div>

      <div className={styles.wordsContainer}>
        <motion.span 
          className={styles.word} 
          style={{ 
            color: useTransform(word1Active, [0, 1], ["transparent", "var(--text-primary)"]),
            WebkitTextStrokeColor: useTransform(word1Active, [0, 1], ["var(--text-secondary)", "var(--text-primary)"])
          }}
        >
          CURATED
        </motion.span>
        <motion.span 
          className={styles.word}
          style={{ 
            color: useTransform(word2Active, [0, 1], ["transparent", "var(--text-primary)"]),
            WebkitTextStrokeColor: useTransform(word2Active, [0, 1], ["var(--text-secondary)", "var(--text-primary)"])
          }}
        >
          IMPORTED
        </motion.span>
        <motion.span 
          className={styles.word}
          style={{ 
            color: useTransform(word3Active, [0, 1], ["transparent", "var(--text-primary)"]),
            WebkitTextStrokeColor: useTransform(word3Active, [0, 1], ["var(--text-secondary)", "var(--text-primary)"])
          }}
        >
          PREMIUM
        </motion.span>
      </div>
    </section>
  );
}
