import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const WORDS = ["SMART", "SCALABLE", "ROBUST", "POWERFUL", "INTELLIGENT"];

const fade = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
});

// Smooth scroll with navbar offset (80px for fixed nav)
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
};

const HeroText = () => {
  return (
    <div
      className="c-space w-full"
      style={{
        paddingTop: "clamp(6rem, 18vh, 10rem)",
        paddingBottom: "clamp(4rem, 10vh, 6rem)",
      }}
    >
      {/* Greeting */}
      <motion.p
        {...fade(0.3)}
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
          fontWeight: 400,
          color: "rgba(180,200,255,0.7)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "clamp(0.5rem, 1.5vh, 1rem)",
        }}
      >
        Hi, I'm Abhi Raj
      </motion.p>

      {/* Main headline block — tight lineHeight so lines feel connected */}
      <div style={{ lineHeight: 1.05 }}>
        <motion.h1
          {...fade(0.5)}
          style={{
            fontSize: "clamp(2.2rem, 6vw, 5rem)",
            fontWeight: 500,
            color: "rgba(220,230,255,0.92)",
            margin: 0,
            display: "block",
          }}
        >
          A Full Stack Developer
        </motion.h1>

        <motion.div {...fade(0.65)} style={{ margin: 0, display: "block" }}>
          <span
            style={{
              fontSize: "clamp(2.2rem, 6vw, 5rem)",
              fontWeight: 500,
              color: "rgba(220,230,255,0.92)",
            }}
          >
            Building&nbsp;
          </span>
          <span style={{ display: "inline-block", verticalAlign: "baseline" }}>
            <FlipWords
              words={WORDS}
              duration={2800}
              className="font-black"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 5rem)",
                background: "linear-gradient(135deg, #60b4ff 0%, #a78bff 50%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            />
          </span>
        </motion.div>

        <motion.h1
          {...fade(0.8)}
          style={{
            fontSize: "clamp(2.2rem, 6vw, 5rem)",
            fontWeight: 700,
            color: "rgba(240,245,255,0.95)",
            margin: 0,
            display: "block",
          }}
        >
          Digital Experiences
        </motion.h1>
      </div>

      {/* Subline */}
      <motion.p
        {...fade(1.0)}
        style={{
          marginTop: "clamp(1.2rem, 3vh, 2rem)",
          fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
          color: "rgba(160,185,240,0.65)",
          maxWidth: "38ch",
          lineHeight: 1.6,
        }}
      >
        Crafting scalable applications with clean code, modern design, and a passion for impactful technology.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        {...fade(1.2)}
        style={{
          marginTop: "clamp(1.5rem, 4vh, 2.5rem)",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {/* View Projects — scrolls to #projects */}
        <button
          onClick={() => scrollTo("projects")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.7rem 1.8rem",
            borderRadius: "100px",
            background: "linear-gradient(135deg, #3b6fd4 0%, #6c3fd1 100%)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 24px rgba(80,120,255,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s",
            fontFamily: "inherit",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 0 36px rgba(80,120,255,0.55)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow = "0 0 24px rgba(80,120,255,0.35)";
          }}
        >
          View Projects ↗
        </button>

        {/* Let's Talk — scrolls to #contact */}
        <button
          onClick={() => scrollTo("contact")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.7rem 1.8rem",
            borderRadius: "100px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(200,215,255,0.9)",
            fontWeight: 500,
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "background 0.2s, transform 0.2s",
            fontFamily: "inherit",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.transform = "";
          }}
        >
          Let's Talk
        </button>
      </motion.div>
    </div>
  );
};

export default HeroText;
