"use client";
import SplitType from "split-type";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

// This is basic usage of Splittype
export default function Splittype() {
  const textRef = useRef(null);

  useGSAP(() => {
    // const text = new SplitType("h1");
    const text = new SplitType(textRef.current) // this is the same as above

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    tl.from(text.chars, {
      // this will fade text in from bottom
      duration: 0.9,
      y: 40, // move 40px down from the top and then back to the original position (so fade to original position)
      opacity: 0,
      skewX: 30,
      stagger: 0.03,
    }).to(text.chars, {
      // this will fade text out to the top
      duration: 0.9,
      y: -40, // move 40px up from the bottom and then back to the original position (so fade to original position)
      opacity: 0,
      skewX: -10,
      stagger: 0.03,
    });

    gsap.set(textRef.current, { autoAlpha: 1 }); // for FOUC stuff
  });

  return (
    <section className="h-screen bg-gray-900 grid place-content-center">
      <h1 ref={textRef} className="text-white text-6xl font-medium invisible">
        UI/UX &amp; Frontend
      </h1>
    </section>
  );
}
