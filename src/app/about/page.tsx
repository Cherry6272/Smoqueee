"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.hero}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Brand Heritage & Concept
        </motion.span>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Curated. Imported. Unapologetic.
        </motion.h1>
        <motion.p
          className={styles.leadText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          SMOQUEE was established to disrupt traditional retail monotony in Bengaluru. We curate international master chocolatiers, rare private blend perfumes, heirloom smoke accessories, and exceptional design objects under a single architectural roof on Thanisandra Main Road.
        </motion.p>
      </section>

      <section className={styles.storyGrid}>
        <motion.div
          className={styles.storyImageWrap}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000"
            alt="Artisanal chocolate and fine imports at SMOQUEE"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>

        <div className={styles.storyContent}>
          <span className={styles.sectionHeader}>The Sourcing Ethos</span>
          <h2 className={styles.storyHeading}>
            Every artifact has a provenance.
          </h2>
          <p className={styles.storyParagraph}>
            We do not stock mass-market novelties. Every bar of chocolate originates from storied estates in Tuscany, Brussels, or Zurich using single-origin criollo beans and master methods certified by European royal warrants.
          </p>
          <p className={styles.storyParagraph}>
            Our fragrance vault features high-concentration extraits and niche compositions from Paris, Florence, and Stockholm. In smoke accessories, we showcase precision-engineered cutters, seasoned Spanish cedar humidors, and aerospace titanium tools crafted for true connoisseurs.
          </p>
        </div>
      </section>

      <section className={styles.pillarsSection}>
        <div style={{ maxWidth: "600px" }}>
          <span className={styles.sectionHeader}>Three Foundations</span>
          <h2 className={styles.storyHeading} style={{ marginTop: "0.5rem" }}>
            The SMOQUEE Standard
          </h2>
        </div>

        <div className={styles.pillarsGrid}>
          <div className={styles.pillarCard}>
            <span className={styles.pillarNumber}>01</span>
            <h3 className={styles.pillarTitle}>Direct International Imports</h3>
            <p className={styles.pillarDesc}>
              Temperature-controlled logistics and strict authenticity controls ensure that delicate bean-to-bar cocoa, rare extraits, and fine accessories reach you in pristine atelier condition.
            </p>
          </div>

          <div className={styles.pillarCard}>
            <span className={styles.pillarNumber}>02</span>
            <h3 className={styles.pillarTitle}>Sensory Flagship Experience</h3>
            <p className={styles.pillarDesc}>
              Located on Thanisandra Main Road, Bengaluru, our boutique is designed as a sanctuary of dark luxury, tactile surfaces, and personalized private concierge consultations.
            </p>
          </div>

          <div className={styles.pillarCard}>
            <span className={styles.pillarNumber}>03</span>
            <h3 className={styles.pillarTitle}>Responsible Connoisseurship</h3>
            <p className={styles.pillarDesc}>
              We champion discernment over excess. Age-restricted smoke accessories and premium collector pieces are handled with strict legal compliance, rigorous age verification, and expert care.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.locationCtaSection}>
        <h2 className={styles.ctaTitle}>
          Discover the collection or visit our Thanisandra store today.
        </h2>
        <div className={styles.ctaButtons}>
          <Link href="/collections" className={styles.primaryBtn}>
            Explore Collections <ArrowRight size={16} />
          </Link>
          <Link href="/store" className={styles.secondaryBtn}>
            <MapPin size={16} /> Store Directions
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
