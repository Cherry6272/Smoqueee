import Link from "next/link";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brandCol}>
            <span className={styles.brandTitle}>SMOQUEE</span>
            <p className={styles.brandTagline}>
              Curated imported chocolates, artisanal perfumes, collector smoke accessories, and rare global finds.
            </p>
            <div className={styles.locationBadge}>
              <MapPin size={16} />
              <span>Thanisandra Main Road · Bengaluru, Karnataka</span>
            </div>
          </div>

          <div className={styles.col}>
            <span className={styles.colTitle}>Collections</span>
            <div className={styles.linkList}>
              <Link href="/collections?category=imported-chocolates" className={styles.link}>
                Imported Chocolates
              </Link>
              <Link href="/collections?category=imported-perfumes" className={styles.link}>
                Imported Perfumes
              </Link>
              <Link href="/collections?category=smoke-accessories" className={styles.link}>
                Smoke Accessories
              </Link>
              <Link href="/collections?category=curated-finds" className={styles.link}>
                Curated Finds
              </Link>
            </div>
          </div>

          <div className={styles.col}>
            <span className={styles.colTitle}>Experience</span>
            <div className={styles.linkList}>
              <Link href="/store" className={styles.link}>
                Visit the Store
              </Link>
              <Link href="/about" className={styles.link}>
                Brand Heritage
              </Link>
              <Link href="/contact" className={styles.link}>
                Private Concierge
              </Link>
              <a
                href="https://maps.google.com/?q=Smoquee+Thanisandra+Main+Road+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Google Maps <ArrowUpRight size={12} style={{ display: "inline" }} />
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <span className={styles.colTitle}>Store Hours</span>
            <div className={styles.hoursBlock}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <Clock size={16} color="var(--accent-primary)" />
                <span className={styles.hoursHighlight}>Open Daily</span>
              </div>
              <p>Monday – Sunday</p>
              <p className={styles.hoursHighlight}>10:00 AM – 11:00 PM</p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Thanisandra Main Road, North Bengaluru
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.complianceNote}>
            © {new Date().getFullYear()} SMOQUEE. All rights reserved. Smoke accessories and age-regulated items are strictly restricted to patrons aged 18 and above in accordance with local laws.
          </div>
          <div>
            <span>Curated. Imported. Unapologetic.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
