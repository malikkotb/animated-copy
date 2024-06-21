"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import SplitType from "split-type";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
gsap.registerPlugin(useGSAP);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const mainRef = useRef(null);

  const textRefs = useRef([]);
  const imageRefs = useRef([]);

  const addToRefs = (refsArray) => (el) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  };

  const addToTextRefs = addToRefs(textRefs);
  const addToImageRefs = addToRefs(imageRefs);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(textRefs.current, { autoAlpha: 1 }); // for FOUC stuff

    textRefs.current.forEach((text, index) => {
      const img = imageRefs.current[index];
      const textSplit = new SplitType(text);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          end: "bottom 50%",
          // scrub: true,
          toggleActions: "play play none reverse",
        },
      });

      tl.from(textSplit.chars, {
        y: 50,
        opacity: 0,
        stagger: 0.005,
        ease: "power2.out",
        duration: 1,
      });

      tl.from(
        img,
        {
          autoAlpha: 0,
          y: 100,
          duration: 2,
        },
        "<"
      );
    });
  });

  return (
    <main ref={mainRef} className="bg-[#130c0c]">
      <section>
        <div className="absolute z-10">
          <span>001</span>
          <p ref={addToTextRefs}>
            The happiness of your life depends upon the quality of your thoughts: therefore, guard accordingly, and take
            care that you entertain no notions unsuitable to virtue and reasonable nature. Do not be disturbed at
            trifles, or at accidents common or unavoidable.
          </p>
        </div>
        <div className="opacity-50" ref={addToImageRefs}>
          <Image className="invisible" src="/2.png" alt="supporting image" width={300} height={300} />
        </div>
      </section>
      <section>
        <div className="absolute z-10">
          <span>002</span>
          <p ref={addToTextRefs}>
            The best revenge is to be unlike him who performed the injury. To engage in retaliation is to mirror the
            actions of those who wronged you, perpetuating a cycle of harm. Instead, rise above and show through your
            actions a higher standard of virtue and character.
          </p>
        </div>
        <div className="opacity-50" ref={addToImageRefs}>
          <Image className="invisible" src="/3.png" alt="supporting image" width={300} height={300} />
        </div>
      </section>
      <section>
        <div className="absolute z-10">
          <span>003</span>
          <p ref={addToTextRefs}>
            Dwell on the beauty of life. Watch the stars, and see yourself running with them. Allow the wonder of the
            universe to inspire you, and let your connection to the vastness of existence fill you with a sense of
            purpose and awe.
          </p>
        </div>
        <div className="opacity-50" ref={addToImageRefs}>
          <Image className="invisible" src="/1.png" alt="supporting image" width={300} height={300} />
        </div>
      </section>
    </main>
  );
}
