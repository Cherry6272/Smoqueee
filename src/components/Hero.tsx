"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Hero.module.css";
import { useTheme } from "next-themes";

function FloatingObjects() {
  const { theme } = useTheme();
  
  const isDark = theme === "dark";
  const materialColor = isDark ? "#111111" : "#ffffff";
  const emissiveColor = isDark ? "#222222" : "#dddddd";
  const sparkleColor = isDark ? "#D4C3B3" : "#1A1A1A";

  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-2, 1, -2]} scale={0.8}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial 
            color={materialColor} 
            emissive={emissiveColor}
            emissiveIntensity={0.2}
            roughness={0.2} 
            metalness={0.8}
            clearcoat={1}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[2, -1, -1]} scale={1.2}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshPhysicalMaterial 
            color={materialColor}
            emissive={emissiveColor}
            emissiveIntensity={0.1}
            roughness={0.1} 
            metalness={1}
            clearcoat={0.5}
          />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={2}>
        <mesh position={[0, -2, -3]} scale={1.5}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial 
            color={materialColor} 
            roughness={0} 
            metalness={0.5} 
            transmission={1} 
            thickness={2}
            ior={1.5}
          />
        </mesh>
      </Float>

      <Sparkles count={80} scale={10} size={2} speed={0.4} opacity={isDark ? 0.4 : 0.2} color={sparkleColor} />
    </group>
  );
}

export function Hero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <PresentationControls
            global
            snap
            speed={1.5}
            damping={0.1}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <FloatingObjects />
          </PresentationControls>
          <Environment preset="city" />
        </Canvas>
      </div>

      <div className={styles.content}>
        <motion.h1 
          className={`h1-display ${styles.brand}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          SMOQUEE
        </motion.h1>
        
        <motion.p 
          className={`body-large ${styles.tagline}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Curated. Imported. Unapologetic.
        </motion.p>
        
        <motion.div 
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link href="/collections" className={styles.primaryBtn}>Explore Collection</Link>
          <Link href="/store" className={styles.secondaryBtn}>Visit Smoquee</Link>
        </motion.div>
      </div>

      <motion.div 
        className={styles.locationInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Thanisandra Main Road · Bengaluru
      </motion.div>
    </section>
  );
}
