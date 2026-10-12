"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./ProductCard.module.css";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  tags: string[];
  availability: "In Stock" | "Out of Stock" | "Limited";
  mainImage?: string;
  secondaryImage?: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, index, onQuickView }: ProductCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className={styles.imageContainer}>
        {product.mainImage ? (
          <Image src={product.mainImage} alt={product.name} fill style={{ objectFit: 'cover' }} className={styles.image} sizes="(max-width: 1024px) 100vw, 50vw" />
        ) : (
          <div 
            className={styles.image} 
            style={{ backgroundColor: "var(--bg-tertiary)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span style={{color: "var(--text-secondary)", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase"}}>Product View 1</span>
          </div>
        )}

        {product.secondaryImage ? (
          <Image src={product.secondaryImage} alt={`${product.name} alternate`} fill style={{ objectFit: 'cover' }} className={styles.secondaryImage} sizes="(max-width: 1024px) 100vw, 50vw" />
        ) : product.mainImage ? (
          <Image src={product.mainImage} alt={product.name} fill style={{ objectFit: 'cover' }} className={styles.secondaryImage} sizes="(max-width: 1024px) 100vw, 50vw" />
        ) : (
          <div 
            className={styles.secondaryImage} 
            style={{ backgroundColor: "var(--accent-primary)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span style={{color: "var(--bg-primary)", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase"}}>Product View 2</span>
          </div>
        )}
        
        <button 
          className={styles.quickViewBtn}
          onClick={(e) => {
            e.stopPropagation();
            if (onQuickView) onQuickView(product);
          }}
        >
          Quick View
        </button>
      </div>
      
      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        
        <div className={styles.footer}>
          <span className={styles.price}>{product.price}</span>
          <span className={styles.exploreLink}>
            View <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
