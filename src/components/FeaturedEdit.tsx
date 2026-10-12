"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./FeaturedEdit.module.css";
import { ProductCard } from "./ProductCard";
import { QuickViewModal } from "./QuickViewModal";
import { PRODUCTS, Product } from "@/data/products";

export function FeaturedEdit() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featuredItems = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className={styles.subtitle}>Curated Selection</span>
          <h2 className={styles.title}>The Smoquee Edit</h2>
        </div>

        <Link href="/collections" className={styles.exploreAll}>
          Explore The Edit <ArrowRight size={16} />
        </Link>
      </div>

      <div className={styles.grid}>
        <motion.div
          className={styles.featuredItem}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/products/lighter.jpg"
            alt="The Obsidian Smoke & Luxury Edit"
            fill
            style={{ objectFit: "cover", zIndex: 0 }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
              zIndex: 1,
            }}
          />
          <div className={styles.featuredItemInner}>
            <span className={styles.featuredCategory}>Flagship Showcase</span>
            <h3 className={styles.featuredTitle}>The Obsidian Selection</h3>
            <p className={styles.featuredDesc}>
              Discover our premier allocation of matte black torch lighters, Spanish cedar humidors, surgical titanium cutters, and rare European dark chocolates.
            </p>
            <Link href="/collections?category=smoke-accessories" className={styles.featuredBtn}>
              Smoke Collection <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        <div className={styles.subGrid}>
          {featuredItems.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </div>

      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
