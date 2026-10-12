"use client";

import { Navbar } from "@/components/Navbar";
import { StoreLocation } from "@/components/StoreLocation";

export default function Store() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "10vh", minHeight: "100vh" }}>
        <StoreLocation />
      </div>
    </main>
  );
}
