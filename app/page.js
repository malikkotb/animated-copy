"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import Splittype from "@/components/Splittype";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
      <Splittype /> {/* This is basic usage of Splittype */}
    </main>
  );
}
