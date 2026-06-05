import HeroText from "../components/HeroText";
import RippleGrid from "../components/RippleGrid";

const Hero = () => {
  return (
    <section
      id="home"
      style={{ background: "#010614", minHeight: "100svh", position: "relative", overflow: "hidden" }}
    >
      {/* Full-bleed RippleGrid background */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <RippleGrid
          enableRainbow={false}
          gridColor="#33c2cc"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.8}
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
