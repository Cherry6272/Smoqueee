"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PresentationControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles as SparklesIcon, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { QuickViewModal } from "./QuickViewModal";
import { PRODUCTS, Product } from "@/data/products";
import styles from "./Hero.module.css";

// 3D Atmospheric Vapor & Floating Smoke Particle System
function SmokeParticleField({ isDark }: { isDark: boolean }) {
  const count = 75;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 6 - 1,
      z: (Math.random() - 0.5) * 6,
      speedY: 0.003 + Math.random() * 0.006,
      rotSpeed: 0.005 + Math.random() * 0.01,
      scale: 0.15 + Math.random() * 0.35,
      wobbleSpeed: 0.5 + Math.random() * 1.2,
      wobbleOffset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      p.y += p.speedY;
      if (p.y > 4) {
        p.y = -3;
        p.x = (Math.random() - 0.5) * 7;
      }
      const wobble = Math.sin(time * p.wobbleSpeed + p.wobbleOffset) * 0.2;

      dummy.position.set(p.x + wobble, p.y, p.z);
      dummy.rotation.set(time * p.rotSpeed, time * p.rotSpeed * 0.7, 0);
      dummy.scale.setScalar(p.scale * (1 + Math.sin(time + i) * 0.15));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshPhysicalMaterial
        color={isDark ? "#2a2723" : "#d8d3cb"}
        roughness={0.8}
        transmission={0.65}
        thickness={0.5}
        transparent
        opacity={isDark ? 0.35 : 0.25}
        wireframe={false}
      />
    </instancedMesh>
  );
}

// 3D Luxury Artifact Centerpiece (Obsidian Flacon with Champagne Gold Core)
function LuxuryCenterpiece() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.25;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3;
      ring1Ref.current.rotation.y = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.25;
      ring2Ref.current.rotation.z = t * 0.35;
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const bodyColor = isDark ? "#0d0d0d" : "#f5f3ef";
  const accentGold = isDark ? "#c8b29b" : "#9e866e";
  const emberColor = "#e68a35";

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Faceted Obsidian Flacon */}
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.8}>
        {/* Main Crystal / Obsidian Chamber */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.85, 1.1, 2.2, 8]} />
          <meshPhysicalMaterial
            color={bodyColor}
            emissive={isDark ? "#14110e" : "#e8e4dc"}
            emissiveIntensity={0.2}
            roughness={0.08}
            metalness={0.25}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.7}
            thickness={2.2}
            ior={1.55}
          />
        </mesh>

        {/* Champagne Gold Collar & Neck */}
        <mesh position={[0, 1.25, 0]}>
          <cylinderGeometry args={[0.42, 0.5, 0.45, 16]} />
          <meshStandardMaterial
            color={accentGold}
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>

        {/* Sculpted Stopper */}
        <mesh position={[0, 1.7, 0]}>
          <octahedronGeometry args={[0.38, 0]} />
          <meshPhysicalMaterial
            color={isDark ? "#181818" : "#ffffff"}
            roughness={0.05}
            metalness={0.5}
            clearcoat={1}
          />
        </mesh>

        {/* Inner Glowing Warm Ember Core */}
        <mesh ref={coreRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshBasicMaterial color={emberColor} transparent opacity={0.65} />
        </mesh>
      </Float>

      {/* Orbiting Gyroscopic Champagne Rings */}
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshStandardMaterial color={accentGold} metalness={0.9} roughness={0.2} />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0, 0]}>
        <torusGeometry args={[2.3, 0.018, 16, 64]} />
        <meshStandardMaterial color={isDark ? "#ffffff" : "#444444"} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Atmospheric Smoke Wisps */}
      <SmokeParticleField isDark={isDark} />

      {/* Sparkles / Gold Embers */}
      <Sparkles
        count={70}
        scale={8}
        size={2.5}
        speed={0.4}
        opacity={isDark ? 0.45 : 0.25}
        color={accentGold}
      />
    </group>
  );
}

export function Hero() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Spotlight product: signature Cohiba travel humidor
  const spotlightProduct = PRODUCTS.find((p) => p.id === "smoke-01") || PRODUCTS[0];

  return (
    <section className={styles.heroContainer}>
      {/* 3D Canvas Background */}
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 7.5], fov: 42 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 8, 5]} intensity={1.2} color="#fff1e0" />
          <directionalLight position={[-6, -4, -4]} intensity={0.6} color="#d4e6ff" />
          <pointLight position={[0, 0, 2]} intensity={0.8} color="#e68a35" />

          <PresentationControls
            global
            snap
            speed={1.2}
            damping={0.12}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 6, Math.PI / 6]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <LuxuryCenterpiece />
          </PresentationControls>
        </Canvas>
      </div>

      {/* Hero Foreground Content */}
      <div className={styles.content}>
        {/* Status Badge */}
        <motion.div
          className={styles.statusBadge}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pulseDot} />
          <span>Flagship Boutique · Thanisandra Main Road · Bengaluru</span>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          className={`h1-display ${styles.brand}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          SMOQUEE
        </motion.h1>

        {/* Editorial Subheading */}
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Curated. Imported. Unapologetic.
        </motion.p>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Bengaluru’s premier architectural retail salon for rare Cuban smoke accessories, European single-origin grand cru chocolates, and niche extrait perfumes.
        </motion.p>

        {/* Actions */}
        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link href="/collections" className={styles.primaryBtn}>
            Explore Collections <ArrowRight size={16} />
          </Link>
          <Link href="/store" className={styles.secondaryBtn}>
            <MapPin size={16} /> Visit Thanisandra Store
          </Link>
        </motion.div>

        {/* Category Quick Jump Dock */}
        <motion.div
          className={styles.categoryDock}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          <Link href="/collections?category=smoke-accessories" className={styles.dockItem}>
            <span>Smoke Accessories</span>
            <span className={styles.dockCount}>8</span>
          </Link>
          <Link href="/collections?category=imported-chocolates" className={styles.dockItem}>
            <span>Imported Chocolates</span>
            <span className={styles.dockCount}>8</span>
          </Link>
          <Link href="/collections?category=imported-perfumes" className={styles.dockItem}>
            <span>Imported Perfumes</span>
            <span className={styles.dockCount}>8</span>
          </Link>
          <Link href="/collections?category=curated-finds" className={styles.dockItem}>
            <span>Curated Finds</span>
            <span className={styles.dockCount}>6</span>
          </Link>
        </motion.div>
      </div>

      {/* Floating Spotlight Card (Desktop) */}
      <motion.div
        className={styles.spotlightCard}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div className={styles.spotlightHeader}>
          <span className={styles.spotlightLabel}>Curator&apos;s Allocation</span>
          <SparklesIcon size={14} color="var(--accent-primary)" />
        </div>
        <p className={styles.spotlightTitle}>{spotlightProduct.name}</p>
        <div className={styles.spotlightFooter}>
          <span className={styles.spotlightPrice}>{spotlightProduct.price}</span>
          <button
            type="button"
            className={styles.spotlightBtn}
            onClick={() => setSelectedProduct(spotlightProduct)}
          >
            Quick View <ArrowRight size={12} />
          </button>
        </div>
      </motion.div>

      {/* Bottom Ticker Bar */}
      <div className={styles.bottomTicker}>
        <span>100% Direct European & Cuban Imports</span>
        <span>Climate-Controlled Humidor Vault</span>
        <span>Private Scent Sampling Table</span>
        <span>Open Daily 10 AM – 11 PM</span>
      </div>

      {/* Quick View Modal for Spotlight Product */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
