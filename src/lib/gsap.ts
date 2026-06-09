import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let initialized = false;

export function initGSAP() {
  if (initialized || typeof window === "undefined") return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  initialized = true;

  gsap.fromTo(
    "#hero h1, #hero .btn",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.2,
    },
  );

  document.querySelectorAll("section[id]").forEach((section, index) => {
    gsap.fromTo(
      section,
      { opacity: 0.4, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
        delay: Math.min(index * 0.02, 0.1),
      },
    );
  });

  const projectCards = document.querySelectorAll("#projects .project-card");
  if (projectCards.length) {
    gsap.fromTo(
      projectCards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 70%",
        },
      },
    );
  }

  document.querySelectorAll(".skill-bar").forEach((bar) => {
    const level = bar.getAttribute("data-level") || "70";
    gsap.fromTo(
      bar,
      { width: "0%" },
      {
        width: `${level}%`,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 85%",
        },
      },
    );
  });
}
