import { motion } from "motion/react";

function rgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

/* ══════════════════════════════════════════════════════════════════
   DATA — matches reference image exactly
══════════════════════════════════════════════════════════════════ */
const PROGRAMMING = [
  { label: "TypeScript", src: "https://cdn.simpleicons.org/typescript/3178C6", color: "#3178c6" },
  { label: "JavaScript", src: "assets/logos/javascript.svg",                   color: "#f7df1e" },
  { label: "Python",     src: "https://cdn.simpleicons.org/python/3776AB",     color: "#3776ab" },
  { label: "C",          src: "https://cdn.simpleicons.org/c/A8B9CC",          color: "#a8b9cc" },
  { label: "C++",        src: "assets/logos/cplusplus.svg",                    color: "#00599c" },
];

const TOOLS_TECH = [
  { label: "React.js",  src: "assets/logos/react.svg",                            color: "#61dafb" },
  { label: "Next.js",   src: "https://cdn.simpleicons.org/nextdotjs/ffffff",       color: "#e0e0e0" },
  { label: "MongoDB",   src: "https://cdn.simpleicons.org/mongodb/47A248",         color: "#47a248" },
  { label: "Firebase",  src: "https://cdn.simpleicons.org/firebase/FFCA28",        color: "#ffca28" },
  { label: "Git",       src: "assets/logos/git.svg",                              color: "#f05032" },
  { label: "GitHub",    src: "assets/logos/github.svg",                           color: "#e0e0e0" },
  { label: "VS Code",   src: "assets/logos/visualstudiocode.svg",                 color: "#007acc" },
  { label: "Postman",   src: "https://cdn.simpleicons.org/postman/FF6C37",        color: "#ff6c37" },
  { label: "Tailwind",  src: "assets/logos/tailwindcss.svg",                      color: "#38bdf8" },
  { label: "Vercel",    src: "https://cdn.simpleicons.org/vercel/ffffff",          color: "#d0d0d0" },
];

const FORENSICS = [
  { label: "Autopsy",    src: "https://www.google.com/s2/favicons?domain=sleuthkit.org&sz=128", color: "#8b8bff" },
  { label: "Wireshark",  src: "https://cdn.simpleicons.org/wireshark/1679A7",      color: "#1679a7" },
  { label: "Nmap",       src: "https://www.google.com/s2/favicons?domain=nmap.org&sz=128", color: "#34d399" },
  { label: "FTK Imager", src: "https://www.google.com/s2/favicons?domain=exterro.com&sz=128", color: "#fb923c" },
  { label: "Kali Linux", src: "https://cdn.simpleicons.org/kalilinux/557C94",      color: "#557c94" },
];

const VIDEO_EDITING = [
  { label: "Premiere Pro",  src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg", color: "#9999ff" },
  { label: "After Effects", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg", color: "#9999ff" },
  { label: "CapCut",        src: "https://www.google.com/s2/favicons?domain=capcut.com&sz=128",          color: "#ffffff" },
  { label: "DaVinci Resolve",src: "https://cdn.simpleicons.org/davinciresolve/FFFFFF",  color: "#ffffff" },
];

/* ══════════════════════════════════════════════════════════════════
   Category header — icon + uppercase label (matches reference style)
══════════════════════════════════════════════════════════════════ */
const CatHeader = ({ icon, label, accent }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
    <span style={{ fontSize: "0.95rem", opacity: 0.85 }}>{icon}</span>
    <span style={{
      fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.16em",
      textTransform: "uppercase", color: accent,
    }}>{label}</span>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   Rectangular badge (matches reference — NOT pill-shaped)
══════════════════════════════════════════════════════════════════ */
const Badge = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.04, duration: 0.3 }}
    whileHover={{ y: -2, scale: 1.04 }}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      padding: "0.4rem 0.75rem",
      borderRadius: "8px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      cursor: "default",
      flexShrink: 0,
    }}
  >
    {item.src ? (
      <img src={item.src} alt="" style={{ width: 16, height: 16, objectFit: "contain", flexShrink: 0 }} />
    ) : (
      <span style={{ fontSize: "0.85rem", lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
    )}
    <span style={{
      fontSize: "0.78rem", fontWeight: 600,
      color: "rgba(220,230,255,0.88)",
      whiteSpace: "nowrap",
    }}>{item.label}</span>
  </motion.div>
);

/* ══════════════════════════════════════════════════════════════════
   Badge row — wraps horizontally
══════════════════════════════════════════════════════════════════ */
const BadgeRow = ({ items }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
    {items.map((item, i) => <Badge key={item.label} item={item} index={i} />)}
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   Main export
══════════════════════════════════════════════════════════════════ */
const SkillsGrid = () => (
  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>

    <CatHeader icon="</>" label="Programming Languages" accent="#818cf8" />
    <BadgeRow items={PROGRAMMING} />

    <CatHeader icon="⚙️" label="Tools & Technologies" accent="#38bdf8" />
    <BadgeRow items={TOOLS_TECH} />

    <CatHeader icon="🛡️" label="Cyber Forensics & Security Tools" accent="#fb7185" />
    <BadgeRow items={FORENSICS} />

    <CatHeader icon="🎬" label="Video Editing" accent="#a78bfa" />
    <BadgeRow items={VIDEO_EDITING} />

  </div>
);

export default SkillsGrid;
