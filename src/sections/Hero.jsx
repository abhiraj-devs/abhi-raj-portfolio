import HeroText from "../components/HeroText";
import CosmicParticleField from "../components/CosmicParticleField";

const Hero = () => {
  return (
    <section
      id="home"
      style={{ background: "#010614", minHeight: "100svh", position: "relative", overflow: "hidden" }}
    >
      {/* Full-bleed particle canvas */}
      <CosmicParticleField />

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
