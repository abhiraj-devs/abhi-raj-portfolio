import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Particles } from "../components/Particles";
import SkillsGrid from "../components/SkillsGrid";
import { motion } from "motion/react";

function hexRgb(hex) {
  const n = parseInt(hex.replace("#",""), 16);
  return `${(n>>16)&255},${(n>>8)&255},${n&255}`;
}

const CHIPS = [
  { v: "</>  Full-Stack",  c: "#818cf8" },
  { v: "✓  Open to Work",  c: "#34d399" },
  { v: "🛡  Cyber Sec",    c: "#fb7185" },
];

const cardBase = {
  borderRadius: "1.1rem",
  border: "1px solid rgba(255,255,255,0.07)",
  position: "relative",
  overflow: "hidden",
};

const About = () => (
  <section className="relative c-space section-spacing" id="about">
    <Particles className="absolute inset-0 -z-50" quantity={100} ease={80} color="#ffffff" refresh />

    <h2 className="text-heading" style={{ marginBottom: "2rem" }}>About Me</h2>

    {/* ═══════════════════════════════════════════════════════════════
        LAYOUT: 3 rows stacked
        Row 1 — Bio card (full width, flex row)
        Row 2 — Skills card (full width)
        Row 3 — 2 columns: Location | Contact CTA
    ═══════════════════════════════════════════════════════════════ */}
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

      {/* ── ROW 1 · BIO ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          ...cardBase,
          background: "linear-gradient(135deg, #0f1221 0%, #141830 60%, #0d1324 100%)",
          padding: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* Dot-grid texture */}
        <div style={{
          position:"absolute",inset:0,opacity:0.06,pointerEvents:"none",
          backgroundImage:"radial-gradient(rgba(140,160,255,.8) 1px, transparent 1px)",
          backgroundSize:"22px 22px",
        }} />
        {/* Top-right corner glow */}
        <div style={{
          position:"absolute",top:0,right:0,width:"45%",height:"100%",pointerEvents:"none",
          background:"radial-gradient(ellipse at top right, rgba(99,102,241,.15) 0%, transparent 65%)",
        }} />

        {/* Left: text content */}
        <div style={{ position:"relative", zIndex:1, flex:"1 1 300px" }}>
          {/* Gradient underline accent */}
          <div style={{
            width:48, height:3, borderRadius:2, marginBottom:"1.2rem",
            background:"linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)",
          }} />
          <h3 style={{ fontSize:"clamp(1.4rem,3vw,2rem)", fontWeight:800, color:"rgba(235,240,255,.96)", marginBottom:"0.75rem" }}>
            Hi, I'm Abhi Raj 👋
          </h3>
          <p style={{ fontSize:"0.92rem", lineHeight:1.75, color:"rgba(160,175,220,.8)", maxWidth:"52ch", marginBottom:"1.5rem" }}>
            CS student &amp; Full-Stack Developer passionate about building impactful
            web apps with a strong foundation in Cyber Forensics &amp; Security.
          </p>
          {/* Chips */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.55rem" }}>
            {CHIPS.map(({v,c}) => (
              <span key={v} style={{
                fontSize:"0.72rem", fontWeight:700, padding:"0.28rem 0.85rem", borderRadius:"6px",
                background:`rgba(${hexRgb(c)},.12)`,
                border:`1px solid rgba(${hexRgb(c)},.35)`,
                color:c, letterSpacing:"0.02em",
              }}>{v}</span>
            ))}
          </div>
        </div>

        {/* Right: Avatar */}
        <div style={{ position:"relative", zIndex:1, flexShrink:0 }}>
          {/* Outer ring glow */}
          <div style={{
            width:160, height:160, borderRadius:"50%",
            background:"rgba(99,102,241,.08)",
            border:"1px solid rgba(99,102,241,.2)",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            {/* Inner avatar */}
            <div style={{
              width:120, height:120, borderRadius:"50%",
              background:"linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 0 40px rgba(99,102,241,.5)",
              overflow:"hidden"
            }}>
              <img src="assets/avatar-vector.png" alt="Abhi Raj" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          {/* Floating dot accents */}
          <div style={{ position:"absolute", top:8, right:8, width:8, height:8, borderRadius:"50%", background:"#34d399", boxShadow:"0 0 8px #34d399" }} />
          <div style={{ position:"absolute", bottom:16, left:0, width:6, height:6, borderRadius:"50%", background:"#818cf8", boxShadow:"0 0 8px #818cf8" }} />
        </div>
      </motion.div>

      {/* ── ROW 2 · SKILLS ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          ...cardBase,
          background: "linear-gradient(135deg, #0f1221 0%, #141830 100%)",
          padding: "2rem 2.5rem",
        }}
      >
        <SkillsGrid />
      </motion.div>

      {/* ── ROW 3 · LOCATION + CONTACT ───────────────────────────────── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}
           className="about-bottom-grid">

        {/* ── Location — globe as background ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            ...cardBase,
            background: "linear-gradient(135deg, #0a0e1a 0%, #0f1525 100%)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            minHeight: "13rem",
            overflow: "hidden",
          }}
        >
          {/* Full rotating globe background */}
          <figure style={{
            position: "absolute", right: "-15%", top: "-20%",
            zIndex: 0, opacity: 0.75, pointerEvents: "none",
          }}>
            <Globe config={{
              width: 420, height: 420, onRender: () => {}, devicePixelRatio: 2,
              phi: 2.1, theta: 0.18, dark: 1, diffuse: 0.4,
              mapSamples: 16000, mapBrightness: 1.2,
              baseColor: [0.12, 0.1, 0.25],
              markerColor: [0.92, 0.28, 0.52],
              glowColor: [0.2, 0.76, 0.8],
              markers: [{ location: [9.3175, 76.6125], size: 0.14 }],
            }} />
          </figure>

          {/* Bottom fade so text is readable */}
          <div style={{
            position: "absolute", inset: "auto 0 0 0", height: "55%",
            background: "linear-gradient(to top, #0a0e1a 30%, transparent)",
            pointerEvents: "none", zIndex: 1,
          }} />

          {/* Text sits at bottom */}
          <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "0.85rem" }}>
            {/* SVG pin icon in a purple box */}
            <div style={{
              width: 44, height: 44, borderRadius: "10px", flexShrink: 0,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(99,102,241,.5)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="white"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "rgba(230,235,255,.95)", marginBottom: "0.2rem" }}>Location</p>
              <p style={{ fontSize: "0.82rem", color: "rgba(160,175,220,.8)" }}>Kerala, India</p>
              <p style={{ fontSize: "0.75rem", color: "rgba(130,145,190,.6)" }}>Open to remote work worldwide</p>
            </div>
          </div>
        </motion.div>

        {/* ── Contact CTA — new vibrant background ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            ...cardBase,
            background: "linear-gradient(135deg, #1e0a3c 0%, #2d1060 40%, #1a0a4a 70%, #0f1535 100%)",
            border: "1px solid rgba(139,92,246,.25)",
            padding: "2rem 2rem 2rem 2.5rem",
            display: "flex", alignItems: "center", gap: "1rem",
            overflow: "hidden",
            minHeight: "13rem",
          }}
        >
          {/* Mesh / aurora glow layers */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(139,92,246,.28) 0%, transparent 60%)",
          }} />
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 60% 80% at 10% 90%, rgba(99,102,241,.18) 0%, transparent 60%)",
          }} />
          {/* Subtle dot grid */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.07, pointerEvents: "none",
            backgroundImage: "radial-gradient(rgba(200,180,255,.8) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }} />
          {/* Decorative ring */}
          <div style={{
            position: "absolute", right: "-3rem", top: "50%", transform: "translateY(-50%)",
            width: 180, height: 180, borderRadius: "50%",
            border: "1px solid rgba(139,92,246,.2)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", right: "-5rem", top: "50%", transform: "translateY(-50%)",
            width: 240, height: 240, borderRadius: "50%",
            border: "1px solid rgba(139,92,246,.1)",
            pointerEvents: "none",
          }} />

          {/* Text + button */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: "1.05rem", fontWeight: 800, color: "rgba(240,235,255,.97)", marginBottom: "0.4rem", maxWidth: "22ch", lineHeight: 1.35 }}>
              Let's build something amazing together!
            </p>
            <p style={{ fontSize: "0.78rem", color: "rgba(180,165,230,.65)", marginBottom: "1.25rem" }}>
              Feel free to reach out if you have a project in mind.
            </p>
            <CopyEmailButton />
          </div>
        </motion.div>
      </div>

    </div>

    {/* Mobile: stack bottom row */}
    <style>{`
      @media (max-width: 640px) {
        .about-bottom-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>

  </section>
);

export default About;
