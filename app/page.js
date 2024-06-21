"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import SplitType from "split-type";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);

  useGSAP(() => {
    const firstText = new SplitType(firstRef.current);
    const secondText = new SplitType(secondRef.current);
    const thirdText = new SplitType(thirdRef.current);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top 20%",
        end: "bottom 50%",
        markers: true,
        // scrub: 1,
      },
      defaults: { ease: "power4.inOut" },
    });

    gsap.set(firstRef.current, { autoAlpha: 1 }); // for FOUC stuff

    // add scrolltrigger to timeline and then use splittype to animate text

    tl.from(firstText.words, {
      duration: 1,
      y: 40,
      opacity: 0,
      skewX: -10,
      stagger: 0.03,
    });
  });

  return (
    <main ref={mainRef} className="bg-[#130c0c]">
      <section>
        <div className="absolute z-10">
          <span>001</span>
          <p ref={firstRef}>
            The happiness of your life depends upon the quality of your thoughts: therefore, guard accordingly, and take
            care that you entertain no notions unsuitable to virtue and reasonable nature. Do not be disturbed at
            trifles, or at accidents common or unavoidable.
          </p>
        </div>
        <div className="opacity-50">
          <Image src="/2.png" alt="supporting image" width={300} height={300} />
        </div>
      </section>
      <section>
        <div className="absolute z-10">
          <span>001</span>
          <p ref={firstRef}>
            The best revenge is to be unlike him who performed the injury. To engage in retaliation is to mirror the
            actions of those who wronged you, perpetuating a cycle of harm. Instead, rise above and show through your
            actions a higher standard of virtue and character.
          </p>
        </div>
        <div className="opacity-50">
          <Image src="/3.png" alt="supporting image" width={300} height={300} />
        </div>
      </section>
      <section>
        <div className="absolute z-10">
          <span>001</span>
          <p ref={firstRef}>
            Dwell on the beauty of life. Watch the stars, and see yourself running with them. Allow the wonder of the
            universe to inspire you, and let your connection to the vastness of existence fill you with a sense of
            purpose and awe.
          </p>
        </div>
        <div className=" opacity-50">
          <Image src="/1.png" alt="supporting image" width={300} height={300} />
        </div>
      </section>
    </main>
  );
}
