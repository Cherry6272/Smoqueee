"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, MapPin, Check } from "lucide-react";
import { Product } from "@/data/products";
import styles from "./QuickViewModal.module.css";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (product) {
      setSelectedImage(product.mainImage);
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [product, onClose]);

  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello SMOQUEE, I'm inquiring about ${product.name} (${product.price}) from your curated collection.`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
        >
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <div className={styles.gallerySection}>
            <div className={styles.mainImageWrap}>
              <Image
                src={selectedImage || product.mainImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
                priority
              />
            </div>

            <div className={styles.thumbnails}>
              <button
                type="button"
                className={`${styles.thumbnailBtn} ${
                  selectedImage === product.mainImage ? styles.active : ""
                }`}
                onClick={() => setSelectedImage(product.mainImage)}
                aria-label="View primary photo"
              >
                <Image
                  src={product.mainImage}
                  alt={`${product.name} primary preview`}
                  fill
                  sizes="64px"
                  style={{ objectFit: "cover" }}
                />
              </button>

              {product.secondaryImage && (
                <button
                  type="button"
                  className={`${styles.thumbnailBtn} ${
                    selectedImage === product.secondaryImage ? styles.active : ""
                  }`}
                  onClick={() => setSelectedImage(product.secondaryImage)}
                  aria-label="View alternate angle"
                >
                  <Image
                    src={product.secondaryImage}
                    alt={`${product.name} alternate preview`}
                    fill
                    sizes="64px"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              )}
            </div>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.headerTags}>
              <span className={styles.brand}>{product.brand}</span>
              <span className={styles.categoryBadge}>· {product.category}</span>
              <span className={styles.availabilityBadge}>
                {product.availability}
              </span>
            </div>

            <h2 id="modal-product-title" className={styles.title}>
              {product.name}
            </h2>

            <div className={styles.priceRow}>
              <span className={styles.price}>{product.price}</span>
              <span className={styles.origin}>Origin: {product.origin}</span>
            </div>

            <p className={styles.description}>
              {product.longDescription || product.description}
            </p>

            {product.specs && product.specs.length > 0 && (
              <div className={styles.specsContainer}>
                {product.specs.map((spec, idx) => (
                  <div key={idx} className={styles.specItem}>
                    <span className={styles.specLabel}>{spec.label}</span>
                    <span className={styles.specValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.actions}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.enquireBtn}
              >
                <MessageCircle size={18} /> Enquire on WhatsApp
              </a>

              <Link
                href="/store"
                className={styles.storeBtn}
                onClick={onClose}
              >
                <MapPin size={18} /> Store Visit
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
