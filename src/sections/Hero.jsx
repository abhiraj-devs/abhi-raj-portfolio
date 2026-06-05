import HeroText from "../components/HeroText";
import Ferrofluid from "../components/Ferrofluid";

const Hero = () => {
  return (
    <section
      id="home"
      style={{ background: "#010614", minHeight: "100svh", position: "relative", overflow: "hidden" }}
    >
      {/* Full-bleed Ferrofluid background */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <Ferrofluid
          colors={['#4F46E5', '#06B6D4', '#E0F2FE']}
          speed={0.5}
          scale={1}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={3}
          shimmer={1}
          glow={2}
          flowDirection="down"
          opacity={1}
          mouseInteraction={true}
          mouseStrength={1}
          mouseRadius={0.3}
          color1="#00bce1"
          color2="#8e4398"
          color3="#30437a"
        />
      </div>

      {/* Hero content — vertically centred, horizontally left-aligned on desktop */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          minHeight: "100svh",
          width: "100%",
        }}
      >
        <HeroText />
      </div>
    </section>
  );
};

export default Hero;
