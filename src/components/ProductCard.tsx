"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import styles from "./ProductCard.module.css";

export type { Product };

interface ProductCardProps {
  product: Product;
  index: number;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, index, onQuickView }: ProductCardProps) {
  const handleOpen = () => {
    if (onQuickView) onQuickView(product);
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      onClick={handleOpen}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
    >
      <div className={styles.imageContainer}>
        {product.mainImage ? (
          <Image
            src={product.mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        ) : (
          <div
            className={styles.image}
            style={{
              backgroundColor: "var(--bg-tertiary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              SMOQUEE
            </span>
          </div>
        )}

        {product.secondaryImage && (
          <Image
            src={product.secondaryImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.secondaryImage}
          />
        )}

        <button
          className={styles.quickViewBtn}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          aria-label={`Quick view ${product.name}`}
        >
          Quick View
        </button>
      </div>

      <div className={styles.content}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className={styles.category}>{product.brand || product.category}</span>
          <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent-primary)" }}>
            {product.availability}
          </span>
        </div>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.footer}>
          <span className={styles.price}>{product.price}</span>
          <span className={styles.exploreLink}>
            Details <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
